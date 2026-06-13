import { apiSlice } from './apiSlice';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setupProfile: builder.mutation({
      query: (formData) => ({
        url: '/profile/setup-profile',
        method: 'POST',
        // FormData automatically sets the correct Content-Type with the boundary
        body: formData,
      }),
    }),
    getProfileByUserId: builder.query({
      query: (id) => `/profile/user/${id}`,
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: '/profile/update-profile',
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSetupProfileMutation, useGetProfileByUserIdQuery, useUpdateProfileMutation } = profileApi;
