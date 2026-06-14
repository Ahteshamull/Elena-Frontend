import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ role = '', page = 1, limit = 100 } = {}) => {
        let url = '/user/all-users';
        if (role) {
          url += `/${role}`;
        }
        url += `?page=${page}&limit=${limit}`;
        return {
          url,
          method: 'GET',
        };
      },
    }),
    getFavorites: builder.query({
      query: () => ({
        url: '/user/favorites',
        method: 'GET',
      }),
      providesTags: ['Favorites'],
    }),
    toggleFavorite: builder.mutation({
      query: (chefId) => ({
        url: `/user/favorite/${chefId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorites', 'Dashboard'],
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: '/user/update-profile',
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['User'], // Assuming it updates user info which may be cached
    }),
  }),
});

export const { useGetAllUsersQuery, useGetFavoritesQuery, useToggleFavoriteMutation, useUpdateUserProfileMutation } = userApi;
