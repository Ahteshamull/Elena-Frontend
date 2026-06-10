import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), 
  tagTypes: [],
  endpoints: (builder) => ({
    
  }),
});
