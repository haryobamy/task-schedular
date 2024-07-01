import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationActionCreatorResult,
  MutationDefinition,
  QueryActionCreatorResult,
  QueryDefinition,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../env';

export type TQueryActionCreatorResult = QueryActionCreatorResult<
  QueryDefinition<
    unknown,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TApiTag,
    unknown,
    'api'
  >
>;

export type TMutationActionCreatorResult = MutationActionCreatorResult<
  MutationDefinition<
    unknown, // Argument type for the mutation
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, // Base query function type
    TApiTag, // Tags used for invalidation
    unknown, // Mutation response type
    'api' // Reducer path
  >
>;

export type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

export type TApiTag = 'Tasks' | 'Task';

export const apiTagTypes: TApiTag[] = ['Tasks', 'Task'];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),

  tagTypes: apiTagTypes,

  endpoints: (builder) => ({}),
});
