import { apiSlice } from './apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notification/list',
      providesTags: ['Notification'],
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notification/mark/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: '/notification/mark-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationApi;
