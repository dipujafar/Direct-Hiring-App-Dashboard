import { get } from "http";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const patApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: () => ({
        url: "/admin/get-terms-of-condition",
        method: "GET",
      }),
      providesTags: [tagTypes.pat],
    }),
    updatedTerms: build.mutation({
      query: (data) => ({
        url: "/admin/update-terms-of-condition",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.pat],
    }),

    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/admin/get-privacy-policy",
        method: "GET",
      }),
      providesTags: [tagTypes.pat],
    }),
    updatedPrivacyPolicy: build.mutation({
      query: (data) => ({
        url: "/admin/update-privacy-policy",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.pat],
    }),

    getAboutUs: build.query({
      query: () => ({
        url: "/admin/get-about",
        method: "GET",
      }),
      providesTags: [tagTypes.pat],
    }),
    updatedAboutUs: build.mutation({
      query: (data) => ({
        url: "/admin/update-about",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.pat],
    }),
  }),
});

export const {
  useGetTermsQuery,
  useUpdatedTermsMutation,

  useGetPrivacyPolicyQuery,
  useUpdatedPrivacyPolicyMutation,

  useGetAboutUsQuery,
  useUpdatedAboutUsMutation,
} = patApi;
