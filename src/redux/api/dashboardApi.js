import { apiSlice } from './apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query({
      query: () => '/dashboard/user-dashboard',
      providesTags: ['Dashboard'],
    }),
    getChefDashboard: builder.query({
      query: () => '/dashboard/chef-dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetUserDashboardQuery, useGetChefDashboardQuery } = dashboardApi;
