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
  }),
});

export const { useGetAllUsersQuery } = userApi;
