import { apiSlice } from './apiSlice';

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (params) => ({
        url: '/conversations',
        params,
      }),
      providesTags: ['Conversation'],
    }),
    getMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 50 }) => ({
        url: `/conversations/${conversationId}/messages`,
        params: { page, limit },
      }),
      providesTags: (result, error, { conversationId }) => [
        { type: 'Message', id: conversationId },
      ],
    }),
    createConversation: builder.mutation({
      query: (receiverId) => ({
        url: '/conversations',
        method: 'POST',
        body: { receiverId },
      }),
      invalidatesTags: ['Conversation'],
    }),
  }),
});

export const { 
  useGetConversationsQuery, 
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useCreateConversationMutation
} = chatApi;
