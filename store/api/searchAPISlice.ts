import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const searchAPISlice = createApi({
  reducerPath: 'api/search',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4020/api`,
    credentials: 'include',
  }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ page, limit, department }) => ({
        url: '/employees',
        params: { page, limit, department },
      }),
      providesTags: ['Search'],
    }),
  }),
})

export const { useGetEmployeesQuery } = searchAPISlice
