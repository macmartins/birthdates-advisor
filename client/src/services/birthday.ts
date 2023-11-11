import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import type { Pokemon } from "./types";

// Define a service using a base URL and expected endpoints
export const birthdayApi = createApi({
  reducerPath: "birthdayApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<unknown, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = birthdayApi;
