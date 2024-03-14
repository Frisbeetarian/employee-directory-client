import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const departmentsAPISlice = createApi({
  reducerPath: 'api/departments',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: '/departments',
      }),
      providesTags: ['Department'],
    }),
    getEmployeesByDepartmentUuid: builder.query({
      query: ({ departmentUuid, page, limit }) => ({
        url: `/departments/${departmentUuid}/employees`,
        params: { page, limit },
      }),
      providesTags: ['Department'],
    }),
  }),
})

export const { useGetDepartmentsQuery, useGetEmployeesByDepartmentUuidQuery } =
  departmentsAPISlice
