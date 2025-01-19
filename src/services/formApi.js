import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Forms', 'Responses'], 
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => 'forms',
      providesTags: ['Forms'], 
    }),
    getFormById: builder.query({
      query: (id) => `forms/${id}`,
      providesTags: (result, error, id) => [{ type: 'Forms', id }], 
    }),
    createForm: builder.mutation({
      query: (newForm) => ({
        url: 'forms',
        method: 'POST',
        body: newForm,
      }),
      invalidatesTags: ['Forms'], 
    }),
    createResponse: builder.mutation({
      query: (response) => ({
        url: 'responses',
        method: 'POST',
        body: response,
      }),
      invalidatesTags: ['Responses'], 
    }),
    getResponses: builder.query({
      query: () => 'responses',
      providesTags: ['Responses'],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useCreateResponseMutation,
  useGetResponsesQuery,
} = formApi;
