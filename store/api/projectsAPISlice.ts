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
    getEmployeesByProjectUuid: builder.query({
      query: ({ projectUuid, page, limit }) => ({
        url: `/projects/${projectUuid}/employees`,
        params: { page, limit },
      }),
      providesTags: ['Project'],
    }),
  }),
})

export const { useGetProjectsQuery, useGetEmployeesByProjectUuidQuery } =
  projectsAPISlice
