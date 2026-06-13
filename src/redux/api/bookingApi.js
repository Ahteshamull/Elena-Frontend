import { apiSlice } from './apiSlice';

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ chefId, body }) => ({
        url: `/booking/${chefId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
    getBookingDetails: builder.query({
      query: (id) => `/booking/${id}`,
      providesTags: (result, error, id) => [{ type: 'Booking', id }],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingDetailsQuery } = bookingApi;
