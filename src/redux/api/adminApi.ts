import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (query) => ({
        url: "/admin/all-users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),

    userDetails: builder.query({
      query: (id) => ({
        url: `/users/details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    userRatio: builder.query({
      query: (query) => ({
        url: "/users/user-ratio",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),

    getDashboardStatistics: builder.query({
      query: () => ({
        url: "/admin/get-dashboard-statistics",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    earningSummary: builder.query({
      query: (query) => ({
        url: "/admin/earning-summary",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.admin, tagTypes.earning],
    }),

    todayTotalEarning: builder.query({
      query: () => ({
        url: "/admin/earning-report",
        method: "GET",
      }),
      providesTags: [tagTypes.admin, tagTypes.earning],
    }),

    allTransactions: builder.query({
      query: (query) => ({
        url: "/admin/all-transactions",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.admin, tagTypes.earning],
    }),

    transactionDetails: builder.query({
      query: (id) => ({
        url: `/admin/transaction/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin, tagTypes.earning],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useUserDetailsQuery,
  useUserRatioQuery,
  useGetDashboardStatisticsQuery,
  useEarningSummaryQuery,
  useTodayTotalEarningQuery,
  useAllTransactionsQuery,
  useTransactionDetailsQuery,
  useDeleteUserMutation,
} = adminApi;
