import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const locationsAPISlice = createApi({
  reducerPath: 'api/locations',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4020/api`,
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
  }),
})

export const { useGetLocationsQuery } = locationsAPISlice
