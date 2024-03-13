import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const searchAPISlice = createApi({
  reducerPath: 'api/search',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4020/api`,
  }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    searchEmployees: builder.query({
      query: ({
        page = 1,
        limit = 12,
        query = '',
        department = '',
        location = '',
      }) => ({
        url: '/search/employees',
        params: {
          page,
          limit,
          query,
          department,
          location,
        },
      }),
      providesTags: ['Search'],
    }),
  }),
})

export const { useSearchEmployeesQuery } = searchAPISlice
