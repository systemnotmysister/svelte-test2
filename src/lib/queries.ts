import { gql } from '@urql/svelte';

export const SEARCH_QUERY = gql`
  query Search($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        status
      }
    }
    episodes(filter: { name: $name }) {
      results {
        id
        name
        episode
      }
    }
  }
`;


export const GET_EPISODE_BY_CODE = gql`
  query GetEpisodeByCode($episode: String!) {
    episodes(filter: { episode: $episode }) {
      results {
        id
        name
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`;


export const useCharacterQuery = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      episode {
        id
        name
        episode
      }
    }
  }
`;




export const GET_EPISODE = gql`
query episodeQuery {
    episodes(page: 1) {
      results {
        id
        name
        episode
      }
    }
  }
`;