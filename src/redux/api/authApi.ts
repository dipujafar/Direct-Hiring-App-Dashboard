import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: build.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: credentials,
      }),
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.profile],
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;
