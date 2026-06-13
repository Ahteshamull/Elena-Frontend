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
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/current-user-login",
        method: "POST",
      }),
      providesTags: ['User']
    }),
    deleteMyAccount: builder.mutation({
      query: () => ({
        url: "/auth/delete-my-account",
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useCreateUserMutation, 
  useVerifyRegistrationMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useGetCurrentUserQuery,
  useDeleteMyAccountMutation
} = authApi;
