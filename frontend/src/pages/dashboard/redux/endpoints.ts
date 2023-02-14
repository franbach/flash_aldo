import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApolloClient } from "@apollo/client";

// import { graphql } from "@/app/helpers";
// import { QUERY_ALL_POSTS, QUERY_SINGLE_POST } from "@/app/graphql/queries";
// import { UPDATE_POST, DELETE_POST } from "@/app/graphql/mutations";

// const API_URL = "http://localhost:3000";

// export const api_get_all_posts = createAsyncThunk("api_get_all_posts", async () => {
//   const response = await fetch(`${API_URL}/posts.json`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return response.json();
// });

// export const api_gql_get_all_posts = createAsyncThunk("api_gql_get_all_posts", async (_, { rejectWithValue }) => {
//   const response = await graphql.client.query({
//     query: QUERY_ALL_POSTS,
//     variables: {},
//   });

//   const { data, loading, error } = response;

//   if (error) {
//     throw rejectWithValue(error);
//   }

//   return { data, loading };
// });

// export const api_gql_get_post = createAsyncThunk("api_gql_get_post", async (payload: any, { rejectWithValue }) => {
//   const response = await graphql.client.query({
//     query: QUERY_SINGLE_POST,
//     variables: { id: payload },
//   });

//   const { data, loading, error } = response;

//   if (error) {
//     throw rejectWithValue(error);
//   }

//   return { data, loading };
// });

// export const api_get_post = createAsyncThunk("api_get_post", async (payload: string | number) => {
//   const response = await fetch(`${API_URL}/posts/${payload}.json`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return response.json();
// });

// export const api_update_post = createAsyncThunk(
//   "api_get_post",
//   async (payload: { post: { id: string | number; title: string; body: string } }) => {
//     const response = await fetch(`${API_URL}/posts/${payload.post.id}.json`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload.post),
//     });

//     return response.json();
//   },
// );

// export const api_gql_update_post = createAsyncThunk(
//   "api_gql_update_post",
//   async (payload: { post: { id: string | number; title: string; body: string } }, { rejectWithValue }) => {
//     try {
//       const response = await graphql.client.mutate({
//         mutation: UPDATE_POST,
//         variables: { input: payload.post },
//       });

//       const { data, loading, error } = response;

//       if (error) {
//         throw rejectWithValue(error);
//       }

//       return { data, loading };
//     } catch (e) {
//       console.log("error", e);
//     }
//   },
// );

// export const api_create_new_post = createAsyncThunk(
//   "api_create_new_post",
//   async (payload: { post: { title: string; body: string } }) => {
//     const response = await fetch(`${API_URL}/posts.json`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload.post),
//     });
//     return response.json();
//   },
// );

// export const api_delete_post = createAsyncThunk("api_delete_post", async (payload: string | number) => {
//   const response = await fetch(`${API_URL}/posts/${payload}.json`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   return response.json();
// });

// export const api_gql_delete_post = createAsyncThunk(
//   "api_gql_delete_post",
//   async (payload: any, { rejectWithValue }) => {
//     const response = await graphql.client.mutate({
//       mutation: DELETE_POST,
//       variables: { input: { id: payload } },
//       refetchQueries: [QUERY_ALL_POSTS],
//     });

//     const { data, loading, error } = response;

//     if (error) {
//       throw rejectWithValue(error);
//     }

//     return { data, loading };
//   },
// );
