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
      query: (status) => (status ? `/booking/client/${status}` : `/booking/client`),
      providesTags: ['Booking'],
    }),
    getChefBookings: builder.query({
      query: (status) => (status ? `/booking/chef/${status}` : `/booking/chef`),
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
    updateBookingDetails: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/booking/${id}/update-details`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingDetailsQuery, useGetClientBookingsQuery, useGetChefBookingsQuery, useUpdateBookingStatusMutation, useUpdateBookingDetailsMutation, useCancelBookingMutation } = bookingApi;
