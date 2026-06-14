import { apiSlice } from './apiSlice';

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ bookingId, body }) => ({
        url: `/review/create-review/${bookingId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review'],
    }),
    getUserPersonalReviews: builder.query({
      query: () => `/review/user-personal`,
      providesTags: ['Review'],
    }),
    getUserReviews: builder.query({
      query: (userId) => `/review/user/${userId}`,
      providesTags: ['Review'],
    }),
  }),
});

export const { useCreateReviewMutation, useGetUserPersonalReviewsQuery, useGetUserReviewsQuery } = reviewApi;
