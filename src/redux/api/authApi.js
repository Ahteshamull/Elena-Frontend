import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/create-user",
        method: "POST",
        body: userData,
      }),
    }),
    verifyRegistration: builder.mutation({
      query: (verifyData) => ({
        url: 'auth/verify-registration',
        method: 'POST',
        body: verifyData,
      }),
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation, useVerifyRegistrationMutation } = authApi;
