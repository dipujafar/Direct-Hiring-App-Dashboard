import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const helperApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allHelpers: builder.query({
      query: (query) => ({
        url: "/helpers/get-all-helpers",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.helper],
    }),
  }),
});

export const { useAllHelpersQuery } = helperApi;
