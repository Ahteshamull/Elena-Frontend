import { apiSlice } from "./apiSlice";

export const legalDocApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLegalDoc: builder.query({
      query: (docType) => `/legalDoc/get-doc/${docType}`,
    }),
  }),
});

export const { useGetLegalDocQuery } = legalDocApi;
