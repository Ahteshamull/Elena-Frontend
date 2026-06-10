import { apiSlice } from "./apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: () => `/faq/get-all-faqs`,
    }),
  }),
});

export const { useGetAllFaqsQuery } = faqApi;
