import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  animals: Array<Animal>;
  animal?: Maybe<Animal>;
  currentUserLogin?: Maybe<User>;
  users: Array<User>;
};


export type QueryAnimalArgs = {
  id: Scalars['Int'];
};

export type Animal = {
  __typename?: 'Animal';
  id: Scalars['Float'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  images: Array<Scalars['String']>;
  size: Scalars['String'];
  type: Scalars['String'];
  gender: Scalars['String'];
  age?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  vaccionations: Scalars['Boolean'];
  neutered: Scalars['Boolean'];
  location: Scalars['String'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAnimal: Animal;
  updateAnimal?: Maybe<Animal>;
  deleteAnimal?: Maybe<Scalars['Boolean']>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddAnimalArgs = {
  props: AnimalInputs;
};


export type MutationUpdateAnimalArgs = {
  props?: Maybe<AnimalInputs>;
  id: Scalars['Float'];
};


export type MutationDeleteAnimalArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UserInputs;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type AnimalInputs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  images: Array<Scalars['String']>;
  size: Scalars['String'];
  type: Scalars['String'];
  gender: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  phone: Scalars['String'];
  vaccionations?: Maybe<Scalars['Boolean']>;
  neutered?: Maybe<Scalars['Boolean']>;
  location: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInputs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'createdDate'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'createdDate'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CurrentUserLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserLoginQuery = (
  { __typename?: 'Query' }
  & { currentUserLogin?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      username
      createdDate
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    user {
      id
      email
      username
      createdDate
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CurrentUserLoginDocument = gql`
    query CurrentUserLogin {
  currentUserLogin {
    id
    username
    email
  }
}
    `;

/**
 * __useCurrentUserLoginQuery__
 *
 * To run a query within a React component, call `useCurrentUserLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserLoginQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserLoginQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserLoginQuery, CurrentUserLoginQueryVariables>) {
        return Apollo.useQuery<CurrentUserLoginQuery, CurrentUserLoginQueryVariables>(CurrentUserLoginDocument, baseOptions);
      }
export function useCurrentUserLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserLoginQuery, CurrentUserLoginQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserLoginQuery, CurrentUserLoginQueryVariables>(CurrentUserLoginDocument, baseOptions);
        }
export type CurrentUserLoginQueryHookResult = ReturnType<typeof useCurrentUserLoginQuery>;
export type CurrentUserLoginLazyQueryHookResult = ReturnType<typeof useCurrentUserLoginLazyQuery>;
export type CurrentUserLoginQueryResult = Apollo.QueryResult<CurrentUserLoginQuery, CurrentUserLoginQueryVariables>;