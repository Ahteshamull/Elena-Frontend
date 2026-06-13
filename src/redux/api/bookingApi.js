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
    getClientBookings: builder.query({
      query: () => `/booking/client`,
      providesTags: ['Booking'],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/booking/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingDetailsQuery, useGetClientBookingsQuery, useUpdateBookingStatusMutation } = bookingApi;
