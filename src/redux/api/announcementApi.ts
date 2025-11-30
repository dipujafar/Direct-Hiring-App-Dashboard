import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allAnnouncements: builder.query({
      query: () => ({
        url: "/admin/get-announcement",
        method: "GET",
      }),
      providesTags: [tagTypes.announcement],
    }),

    addAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/admin/create-announcement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.announcement],
    }),

    updateAnnouncement: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/update-announcement/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.announcement],
    }),

    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-announcement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.announcement],
    }),
  }),
});

export const {
  useAllAnnouncementsQuery,
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
} = announcementApi;
