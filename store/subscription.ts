// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./types";

// Define a service using a base URL and expected endpoints

interface Subscription {
  _id: string;
  students: string[];
  price: number;
  description: string;
  info: string;
  kind: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export const subscriptionApi = createApi({
  reducerPath: "subscriptionhApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://elearningloutas.herokuapp.com/",
  }),
  tagTypes: ["Subscriptions"],
  endpoints: (builder) => ({
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => ({
        url: `subscription?allowPagination=false`,
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
    }),
    addSubscription: builder.mutation<
      Subscription,
      { token: string; id: string }
    >({
      query: ({ id, token }) => ({
        url: `subscription/addSubscribtion/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    removeSubscription: builder.mutation<
      Subscription,
      { token: string; id: string }
    >({
      query: ({ id, token }) => ({
        url: `subscription/removeSubscribtion/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    getMySubscriptions: builder.query<Subscription[], string>({
      query: (token) => ({
        url: `subscription/mySubscriptopns`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Subscriptions"],
    }),
    otherSubscriptions: builder.query<Subscription[], string>({
      query: (token) => ({
        url: `subscription/otherSubscriptopns`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Subscriptions"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useAddSubscriptionMutation,
  useGetMySubscriptionsQuery,
  useGetSubscriptionsQuery,
  useOtherSubscriptionsQuery,
  useRemoveSubscriptionMutation,
} = subscriptionApi;

///Access Api
/* import { pokemonApi } from './pokemon'

const useGetPokemonByNameQuery = pokemonApi.endpoints.getPokemonByName.useQuery */
