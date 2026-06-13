import { apiSlice } from './apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (formData) => ({
        url: '/contact/create-contact',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
