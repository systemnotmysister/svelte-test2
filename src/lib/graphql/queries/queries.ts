import { gql } from '@urql/core';

export const GET_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

export const GET_EPISODE = gql`
  query getEpisode($episode: String!) {
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

export const GET_EPISODES = gql`
query getEpisodes{
  episodes(page: 1) {
    results {
      id
      name
      episode
    }
  }
}
`;


export const GET_SEARCH_QUERY = gql`
  query getSearchResults($search: String!) {
    characters(filter: { name: $search }) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
    episodes(filter: { name: $search }) {
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
