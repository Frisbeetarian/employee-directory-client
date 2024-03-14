import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const locationsAPISlice = createApi({
  reducerPath: 'api/locations',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => ({
        url: '/locations',
      }),
      providesTags: ['Location'],
    }),
    getEmployeesByLocationUuid: builder.query({
      query: ({ locationUuid, page, limit }) => ({
        url: `/locations/${locationUuid}/employees`,
        params: { page, limit },
      }),
      providesTags: ['Location'],
    }),
  }),
})

export const { useGetLocationsQuery, useGetEmployeesByLocationUuidQuery } =
  locationsAPISlice
