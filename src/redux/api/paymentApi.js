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
  }),
});

export const { useCreateCheckoutSessionMutation, useVerifyPaymentQuery } = paymentApi;
