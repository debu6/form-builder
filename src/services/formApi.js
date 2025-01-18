// src/services/formApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => 'forms',
    }),
    getFormById: builder.query({
      query: (id) => `forms/${id}`,
    }),
    createForm: builder.mutation({
      query: (newForm) => ({
        url: 'forms',
        method: 'POST',
        body: newForm,
      }),
    }),
    createResponse: builder.mutation({
      query: (response) => ({
        url: 'responses',
        method: 'POST',
        body: response,
      }),
    }),
    getResponses: builder.query({
      query: () => 'responses',
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useCreateResponseMutation,
  useGetResponsesQuery,  // Ensure this is exported
} = formApi;
