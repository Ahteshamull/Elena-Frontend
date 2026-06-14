import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: `/payment/checkout/${bookingId}`,
        method: 'POST',
      }),
    }),
    verifyPayment: builder.query({
      query: (sessionId) => ({
        url: `/payment/verify/${sessionId}`,
        method: 'GET',
      }),
    }),
    getChefEarnings: builder.query({
      query: (params) => ({
        url: `/payment/chef-earnings`,
        method: 'GET',
        params,
      }),
    }),
    stripeAccountOnboarding: builder.mutation({
      query: () => ({
        url: '/payment/stripe-account-onboarding',
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useVerifyPaymentQuery, useGetChefEarningsQuery, useStripeAccountOnboardingMutation } = paymentApi;
