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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  animalPosts: PaginatedAnimalsPosts;
  animal?: Maybe<Animal>;
  currentUserLogin?: Maybe<User>;
  users: Array<User>;
};


export type QueryAnimalPostsArgs = {
  type?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryAnimalArgs = {
  id: Scalars['Int'];
};

export type PaginatedAnimalsPosts = {
  __typename?: 'PaginatedAnimalsPosts';
  animalPost: Array<Animal>;
  hasMore: Scalars['Boolean'];
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
  age?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  vaccionations: Scalars['Boolean'];
  neutered: Scalars['Boolean'];
  location: Scalars['String'];
  creatorId: Scalars['Float'];
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
  addAnimal: AnimalResponse;
  updateAnimal?: Maybe<Animal>;
  deleteAnimal?: Maybe<Scalars['Boolean']>;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddAnimalArgs = {
  images: Scalars['Upload'];
  props: AnimalInputs;
};


export type MutationUpdateAnimalArgs = {
  images: Scalars['Upload'];
  props?: Maybe<AnimalInputs>;
  id: Scalars['Float'];
};


export type MutationDeleteAnimalArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInputs;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type AnimalResponse = {
  __typename?: 'AnimalResponse';
  errors?: Maybe<Array<FieldError>>;
  animal?: Maybe<Animal>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};


export type AnimalInputs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  size: Scalars['String'];
  type: Scalars['String'];
  gender: Scalars['String'];
  age?: Maybe<Scalars['String']>;
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

export type UserInputs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AddAnimalPostMutationVariables = Exact<{
  size: Scalars['String'];
  name: Scalars['String'];
  images: Scalars['Upload'];
  description?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  gender: Scalars['String'];
  phone: Scalars['String'];
  location: Scalars['String'];
  vaccionations: Scalars['Boolean'];
  neutered: Scalars['Boolean'];
}>;


export type AddAnimalPostMutation = (
  { __typename?: 'Mutation' }
  & { addAnimal: (
    { __typename?: 'AnimalResponse' }
    & { animal?: Maybe<(
      { __typename?: 'Animal' }
      & Pick<Animal, 'id' | 'name' | 'creatorId' | 'description' | 'type' | 'createdDate'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'email'>
    )> }
  ) }
);

export type DeleteAnimalPostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAnimalPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAnimal'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

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

export type UpdateAnimalPostMutationVariables = Exact<{
  size: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  images: Scalars['Upload'];
  type: Scalars['String'];
  gender: Scalars['String'];
  phone: Scalars['String'];
  location: Scalars['String'];
  vaccionations: Scalars['Boolean'];
  neutered: Scalars['Boolean'];
  id: Scalars['Float'];
}>;


export type UpdateAnimalPostMutation = (
  { __typename?: 'Mutation' }
  & { updateAnimal?: Maybe<(
    { __typename?: 'Animal' }
    & Pick<Animal, 'id' | 'name' | 'type' | 'description'>
  )> }
);

export type AnimalPostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AnimalPostQuery = (
  { __typename?: 'Query' }
  & { animal?: Maybe<(
    { __typename?: 'Animal' }
    & Pick<Animal, 'name' | 'id' | 'description' | 'images' | 'size' | 'type' | 'gender' | 'age' | 'phone' | 'creatorId' | 'location' | 'createdDate' | 'vaccionations' | 'neutered'>
  )> }
);

export type AnimalPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}>;


export type AnimalPostsQuery = (
  { __typename?: 'Query' }
  & { animalPosts: (
    { __typename?: 'PaginatedAnimalsPosts' }
    & Pick<PaginatedAnimalsPosts, 'hasMore'>
    & { animalPost: Array<(
      { __typename?: 'Animal' }
      & Pick<Animal, 'id' | 'name' | 'images' | 'type' | 'createdDate' | 'location' | 'gender' | 'size' | 'creatorId'>
    )> }
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


export const AddAnimalPostDocument = gql`
    mutation AddAnimalPost($size: String!, $name: String!, $images: Upload!, $description: String, $age: String, $type: String!, $gender: String!, $phone: String!, $location: String!, $vaccionations: Boolean!, $neutered: Boolean!) {
  addAnimal(props: {size: $size, name: $name, description: $description, age: $age, type: $type, gender: $gender, phone: $phone, location: $location, vaccionations: $vaccionations, neutered: $neutered}, images: $images) {
    animal {
      id
      name
      creatorId
      description
      type
      createdDate
    }
    errors {
      field
      message
    }
  }
}
    `;
export type AddAnimalPostMutationFn = Apollo.MutationFunction<AddAnimalPostMutation, AddAnimalPostMutationVariables>;

/**
 * __useAddAnimalPostMutation__
 *
 * To run a mutation, you first call `useAddAnimalPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnimalPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnimalPostMutation, { data, loading, error }] = useAddAnimalPostMutation({
 *   variables: {
 *      size: // value for 'size'
 *      name: // value for 'name'
 *      images: // value for 'images'
 *      description: // value for 'description'
 *      age: // value for 'age'
 *      type: // value for 'type'
 *      gender: // value for 'gender'
 *      phone: // value for 'phone'
 *      location: // value for 'location'
 *      vaccionations: // value for 'vaccionations'
 *      neutered: // value for 'neutered'
 *   },
 * });
 */
export function useAddAnimalPostMutation(baseOptions?: Apollo.MutationHookOptions<AddAnimalPostMutation, AddAnimalPostMutationVariables>) {
        return Apollo.useMutation<AddAnimalPostMutation, AddAnimalPostMutationVariables>(AddAnimalPostDocument, baseOptions);
      }
export type AddAnimalPostMutationHookResult = ReturnType<typeof useAddAnimalPostMutation>;
export type AddAnimalPostMutationResult = Apollo.MutationResult<AddAnimalPostMutation>;
export type AddAnimalPostMutationOptions = Apollo.BaseMutationOptions<AddAnimalPostMutation, AddAnimalPostMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    user {
      username
      id
      email
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteAnimalPostDocument = gql`
    mutation deleteAnimalPost($id: Int!) {
  deleteAnimal(id: $id)
}
    `;
export type DeleteAnimalPostMutationFn = Apollo.MutationFunction<DeleteAnimalPostMutation, DeleteAnimalPostMutationVariables>;

/**
 * __useDeleteAnimalPostMutation__
 *
 * To run a mutation, you first call `useDeleteAnimalPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnimalPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAnimalPostMutation, { data, loading, error }] = useDeleteAnimalPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAnimalPostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAnimalPostMutation, DeleteAnimalPostMutationVariables>) {
        return Apollo.useMutation<DeleteAnimalPostMutation, DeleteAnimalPostMutationVariables>(DeleteAnimalPostDocument, baseOptions);
      }
export type DeleteAnimalPostMutationHookResult = ReturnType<typeof useDeleteAnimalPostMutation>;
export type DeleteAnimalPostMutationResult = Apollo.MutationResult<DeleteAnimalPostMutation>;
export type DeleteAnimalPostMutationOptions = Apollo.BaseMutationOptions<DeleteAnimalPostMutation, DeleteAnimalPostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const UpdateAnimalPostDocument = gql`
    mutation updateAnimalPost($size: String!, $name: String!, $description: String, $age: String, $images: Upload!, $type: String!, $gender: String!, $phone: String!, $location: String!, $vaccionations: Boolean!, $neutered: Boolean!, $id: Float!) {
  updateAnimal(id: $id, props: {size: $size, name: $name, description: $description, age: $age, type: $type, gender: $gender, phone: $phone, location: $location, vaccionations: $vaccionations, neutered: $neutered}, images: $images) {
    id
    name
    type
    description
  }
}
    `;
export type UpdateAnimalPostMutationFn = Apollo.MutationFunction<UpdateAnimalPostMutation, UpdateAnimalPostMutationVariables>;

/**
 * __useUpdateAnimalPostMutation__
 *
 * To run a mutation, you first call `useUpdateAnimalPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnimalPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnimalPostMutation, { data, loading, error }] = useUpdateAnimalPostMutation({
 *   variables: {
 *      size: // value for 'size'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      age: // value for 'age'
 *      images: // value for 'images'
 *      type: // value for 'type'
 *      gender: // value for 'gender'
 *      phone: // value for 'phone'
 *      location: // value for 'location'
 *      vaccionations: // value for 'vaccionations'
 *      neutered: // value for 'neutered'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateAnimalPostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnimalPostMutation, UpdateAnimalPostMutationVariables>) {
        return Apollo.useMutation<UpdateAnimalPostMutation, UpdateAnimalPostMutationVariables>(UpdateAnimalPostDocument, baseOptions);
      }
export type UpdateAnimalPostMutationHookResult = ReturnType<typeof useUpdateAnimalPostMutation>;
export type UpdateAnimalPostMutationResult = Apollo.MutationResult<UpdateAnimalPostMutation>;
export type UpdateAnimalPostMutationOptions = Apollo.BaseMutationOptions<UpdateAnimalPostMutation, UpdateAnimalPostMutationVariables>;
export const AnimalPostDocument = gql`
    query animalPost($id: Int!) {
  animal(id: $id) {
    name
    id
    description
    images
    size
    type
    gender
    age
    phone
    creatorId
    location
    createdDate
    vaccionations
    neutered
  }
}
    `;

/**
 * __useAnimalPostQuery__
 *
 * To run a query within a React component, call `useAnimalPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimalPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimalPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnimalPostQuery(baseOptions?: Apollo.QueryHookOptions<AnimalPostQuery, AnimalPostQueryVariables>) {
        return Apollo.useQuery<AnimalPostQuery, AnimalPostQueryVariables>(AnimalPostDocument, baseOptions);
      }
export function useAnimalPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimalPostQuery, AnimalPostQueryVariables>) {
          return Apollo.useLazyQuery<AnimalPostQuery, AnimalPostQueryVariables>(AnimalPostDocument, baseOptions);
        }
export type AnimalPostQueryHookResult = ReturnType<typeof useAnimalPostQuery>;
export type AnimalPostLazyQueryHookResult = ReturnType<typeof useAnimalPostLazyQuery>;
export type AnimalPostQueryResult = Apollo.QueryResult<AnimalPostQuery, AnimalPostQueryVariables>;
export const AnimalPostsDocument = gql`
    query AnimalPosts($limit: Int!, $cursor: String, $type: String) {
  animalPosts(limit: $limit, cursor: $cursor, type: $type) {
    animalPost {
      id
      name
      images
      type
      createdDate
      location
      gender
      size
      creatorId
    }
    hasMore
  }
}
    `;

/**
 * __useAnimalPostsQuery__
 *
 * To run a query within a React component, call `useAnimalPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimalPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimalPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAnimalPostsQuery(baseOptions?: Apollo.QueryHookOptions<AnimalPostsQuery, AnimalPostsQueryVariables>) {
        return Apollo.useQuery<AnimalPostsQuery, AnimalPostsQueryVariables>(AnimalPostsDocument, baseOptions);
      }
export function useAnimalPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimalPostsQuery, AnimalPostsQueryVariables>) {
          return Apollo.useLazyQuery<AnimalPostsQuery, AnimalPostsQueryVariables>(AnimalPostsDocument, baseOptions);
        }
export type AnimalPostsQueryHookResult = ReturnType<typeof useAnimalPostsQuery>;
export type AnimalPostsLazyQueryHookResult = ReturnType<typeof useAnimalPostsLazyQuery>;
export type AnimalPostsQueryResult = Apollo.QueryResult<AnimalPostsQuery, AnimalPostsQueryVariables>;
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