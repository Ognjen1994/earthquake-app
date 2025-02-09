import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Earthquake = {
  __typename?: 'Earthquake';
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  magnitude: Scalars['Float']['output'];
};

export type EarthquakeInput = {
  date: Scalars['String']['input'];
  location: Scalars['String']['input'];
  magnitude: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEarthquake: Earthquake;
  deleteEarthquake?: Maybe<Scalars['Boolean']['output']>;
  updateEarthquake: Earthquake;
};


export type MutationAddEarthquakeArgs = {
  date: Scalars['String']['input'];
  location: Scalars['String']['input'];
  magnitude: Scalars['Float']['input'];
};


export type MutationDeleteEarthquakeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateEarthquakeArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  magnitude?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  earthquakeCount?: Maybe<Scalars['Int']['output']>;
  earthquakes?: Maybe<Array<Maybe<Earthquake>>>;
};


export type QueryEarthquakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type EarthquakesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type EarthquakesQuery = { __typename?: 'Query', earthquakeCount?: number | null, earthquakes?: Array<{ __typename?: 'Earthquake', id: string, location: string, magnitude: number, date: string } | null> | null };

export type AddEarthquakeMutationVariables = Exact<{
  location: Scalars['String']['input'];
  magnitude: Scalars['Float']['input'];
  date: Scalars['String']['input'];
}>;


export type AddEarthquakeMutation = { __typename?: 'Mutation', addEarthquake: { __typename?: 'Earthquake', id: string } };

export type UpdateEarthquakeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  magnitude?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateEarthquakeMutation = { __typename?: 'Mutation', updateEarthquake: { __typename?: 'Earthquake', id: string } };

export type DeleteEarthquakeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEarthquakeMutation = { __typename?: 'Mutation', deleteEarthquake?: boolean | null };


export const EarthquakesDocument = gql`
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

/**
 * __useEarthquakesQuery__
 *
 * To run a query within a React component, call `useEarthquakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEarthquakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEarthquakesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useEarthquakesQuery(baseOptions: Apollo.QueryHookOptions<EarthquakesQuery, EarthquakesQueryVariables> & ({ variables: EarthquakesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EarthquakesQuery, EarthquakesQueryVariables>(EarthquakesDocument, options);
      }
export function useEarthquakesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EarthquakesQuery, EarthquakesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EarthquakesQuery, EarthquakesQueryVariables>(EarthquakesDocument, options);
        }
export function useEarthquakesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EarthquakesQuery, EarthquakesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EarthquakesQuery, EarthquakesQueryVariables>(EarthquakesDocument, options);
        }
export type EarthquakesQueryHookResult = ReturnType<typeof useEarthquakesQuery>;
export type EarthquakesLazyQueryHookResult = ReturnType<typeof useEarthquakesLazyQuery>;
export type EarthquakesSuspenseQueryHookResult = ReturnType<typeof useEarthquakesSuspenseQuery>;
export type EarthquakesQueryResult = Apollo.QueryResult<EarthquakesQuery, EarthquakesQueryVariables>;
export const AddEarthquakeDocument = gql`
    mutation AddEarthquake($location: String!, $magnitude: Float!, $date: String!) {
  addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
    id
  }
}
    `;
export type AddEarthquakeMutationFn = Apollo.MutationFunction<AddEarthquakeMutation, AddEarthquakeMutationVariables>;

/**
 * __useAddEarthquakeMutation__
 *
 * To run a mutation, you first call `useAddEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEarthquakeMutation, { data, loading, error }] = useAddEarthquakeMutation({
 *   variables: {
 *      location: // value for 'location'
 *      magnitude: // value for 'magnitude'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useAddEarthquakeMutation(baseOptions?: Apollo.MutationHookOptions<AddEarthquakeMutation, AddEarthquakeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEarthquakeMutation, AddEarthquakeMutationVariables>(AddEarthquakeDocument, options);
      }
export type AddEarthquakeMutationHookResult = ReturnType<typeof useAddEarthquakeMutation>;
export type AddEarthquakeMutationResult = Apollo.MutationResult<AddEarthquakeMutation>;
export type AddEarthquakeMutationOptions = Apollo.BaseMutationOptions<AddEarthquakeMutation, AddEarthquakeMutationVariables>;
export const UpdateEarthquakeDocument = gql`
    mutation UpdateEarthquake($id: ID!, $location: String, $magnitude: Float, $date: String) {
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
export type UpdateEarthquakeMutationFn = Apollo.MutationFunction<UpdateEarthquakeMutation, UpdateEarthquakeMutationVariables>;

/**
 * __useUpdateEarthquakeMutation__
 *
 * To run a mutation, you first call `useUpdateEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEarthquakeMutation, { data, loading, error }] = useUpdateEarthquakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      location: // value for 'location'
 *      magnitude: // value for 'magnitude'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useUpdateEarthquakeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEarthquakeMutation, UpdateEarthquakeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEarthquakeMutation, UpdateEarthquakeMutationVariables>(UpdateEarthquakeDocument, options);
      }
export type UpdateEarthquakeMutationHookResult = ReturnType<typeof useUpdateEarthquakeMutation>;
export type UpdateEarthquakeMutationResult = Apollo.MutationResult<UpdateEarthquakeMutation>;
export type UpdateEarthquakeMutationOptions = Apollo.BaseMutationOptions<UpdateEarthquakeMutation, UpdateEarthquakeMutationVariables>;
export const DeleteEarthquakeDocument = gql`
    mutation DeleteEarthquake($id: ID!) {
  deleteEarthquake(id: $id)
}
    `;
export type DeleteEarthquakeMutationFn = Apollo.MutationFunction<DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables>;

/**
 * __useDeleteEarthquakeMutation__
 *
 * To run a mutation, you first call `useDeleteEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEarthquakeMutation, { data, loading, error }] = useDeleteEarthquakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEarthquakeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables>(DeleteEarthquakeDocument, options);
      }
export type DeleteEarthquakeMutationHookResult = ReturnType<typeof useDeleteEarthquakeMutation>;
export type DeleteEarthquakeMutationResult = Apollo.MutationResult<DeleteEarthquakeMutation>;
export type DeleteEarthquakeMutationOptions = Apollo.BaseMutationOptions<DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables>;