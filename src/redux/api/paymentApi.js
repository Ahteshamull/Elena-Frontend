import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: `/payment/checkout/${bookingId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApi;
