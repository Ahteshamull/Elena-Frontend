import { apiSlice } from "./apiSlice";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new menu
    createMenu: builder.mutation({
      query: (formData) => ({
        url: "/menu/create-menu",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    // Get logged-in user's menus
    getMyMenus: builder.query({
      query: () => ({
        url: "/menu/my-menus",
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),

    // Get menus of a specific user/chef
    getMenusByUserId: builder.query({
      query: (id) => ({
        url: `/menu/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),

    // Update a menu
    updateMenu: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/menu/update-menu/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    // Delete a menu
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/delete-menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useCreateMenuMutation,
  useGetMyMenusQuery,
  useGetMenusByUserIdQuery,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
