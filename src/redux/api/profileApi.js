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
  }),
});

export const { useSetupProfileMutation } = profileApi;
