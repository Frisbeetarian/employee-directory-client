import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectsAPISlice = createApi({
  reducerPath: 'api/projects',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4020/api`,
    credentials: 'include',
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: '/projects',
      }),
      providesTags: ['Project'],
    }),
  }),
})

export const { useGetProjectsQuery } = projectsAPISlice
