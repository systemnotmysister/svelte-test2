import type { KVNamespace } from "@cloudflare/workers-types";

export interface Env {
  KV: KVNamespace; // Cloudflare KV binding
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Хэшируем тело запроса для уникальности кеша
    const requestBody = request.method === "POST" ? await request.text() : "";
    const cacheKey = `${url.pathname}:${await hash(requestBody)}`;
    const LRU_ORDER_KEY = "lru_order"; 
    const LRU_MAX_SIZE = 100; 

    const cachedValue = await env.KV.get(cacheKey);
    if (cachedValue) {
      console.log(`[Cache Hit] Key: ${cacheKey}`);
      await updateLRUOrder(env, LRU_ORDER_KEY, cacheKey, LRU_MAX_SIZE);
      return new Response(cachedValue, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Cache-Control": "public, max-age=60",
        },
      });
    }

    if (url.pathname.startsWith("/api/graphql")) {
      try {
        const apiResponse = await fetch("https://rickandmortyapi.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        if (apiResponse.ok) {
          const apiData = await apiResponse.text();
          console.log(`[API] Fetched data for ${cacheKey}`);

          await env.KV.put(cacheKey, apiData);
          console.log(`[Cache Write] Key: ${cacheKey}`);

          await updateLRUOrder(env, LRU_ORDER_KEY, cacheKey, LRU_MAX_SIZE);

          return new Response(apiData, {
            status: 200,
            headers: {
              ...corsHeaders,
              "Cache-Control": "public, max-age=60",
            },
          });
        } else {
          return new Response("API request failed", { status: apiResponse.status });
        }
      } catch (error) {
        console.error(`[API Error] {error.message}`);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    return new Response("Hello from worker!", {
      status: 200,
      headers: corsHeaders,
    });
  },
};

async function hash(data: string): Promise<string> {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function updateLRUOrder(env: Env, lruKey: string, newKey: string, maxSize: number) {
  const lruOrder = await env.KV.get(lruKey, { type: "json" }) as string[] || [];
  const index = lruOrder.indexOf(newKey);

  if (index > -1) {
    lruOrder.splice(index, 1);
  }

  lruOrder.unshift(newKey);

  if (lruOrder.length > maxSize) {
    const removedKey = lruOrder.pop();
    if (removedKey) {
      console.log(`[LRU Eviction] Removing oldest key: ${removedKey}`);
      await env.KV.delete(removedKey);
    }
  }

  await env.KV.put(lruKey, JSON.stringify(lruOrder));
}
