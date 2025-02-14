import { gql } from "@apollo/client";

export const GET_EARTHQUAKES = gql`
  query Earthquakes($limit: Int!, $offset: Int!) {
    earthquakes(limit: $limit, offset: $offset) {
      id
      location
      magnitude
      date
    }
    earthquakeCount
  }
`;

export const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake(
    $location: String!
    $magnitude: Float!
    $date: String!
  ) {
    addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
    }
  }
`;

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake(
    $id: ID!
    $location: String
    $magnitude: Float
    $date: String
  ) {
    updateEarthquake(
      id: $id
      location: $location
      magnitude: $magnitude
      date: $date
    ) {
      id
    }
  }
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;
