import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BirthdayAPI } from "../types/Birthday";

// Define a service using a base URL and expected endpoints
export const birthdayApi = createApi({
  reducerPath: "birthdayApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/birthdays" }),
  endpoints: (builder) => ({
    getBirthdays: builder.query<BirthdayAPI[], undefined>({
      query: () => ``,
      transformResponse: (response: { result: BirthdayAPI[] }) =>
        response.result,
    }),
    createBirthday: builder.mutation<{ _id: string }, BirthdayAPI>({
      query: (birthday) => ({
        url: "",
        method: "POST",
        body: {
          data: birthday,
        },
      }),
      async onQueryStarted(
        birthdayObj,
        { dispatch, queryFulfilled, getCacheEntry }
      ) {
        const postResult = dispatch(
          birthdayApi.util.updateQueryData(
            "getBirthdays",
            undefined,
            (draft) => {
              draft.push(birthdayObj);
            }
          )
        );
        try {
          await queryFulfilled;
          const id = getCacheEntry().data?._id;
          const indexOfAdd = Number(postResult.patches[0].path[0]);
          dispatch(
            birthdayApi.util.updateQueryData(
              "getBirthdays",
              undefined,
              (draft) => {
                draft[indexOfAdd] = {
                  ...birthdayObj,
                  _id: id as string,
                };
              }
            )
          );
        } catch {
          postResult.undo();
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBirthdaysQuery, useCreateBirthdayMutation } = birthdayApi;
