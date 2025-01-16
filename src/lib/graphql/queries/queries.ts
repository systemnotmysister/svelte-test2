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
// export const episodeQuery = gql`
// query episode($episode: String!) {
//   episodes(filter: { episode: $episode }) {
//     results {
//       id
//       name
//       episode
//       characters {
//         id
//         name
//         image
//       }
//     }
//   }
// }
// `;