import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeesAPISlice = createApi({
  reducerPath: 'api/employees',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4020/api`,
    credentials: 'include',
  }),
  tagTypes: ['Employee', 'Department'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ page = 1, limit = 12, department }) => ({
        url: '/employees',
        params: { page, limit, department },
      }),
      providesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation({
      query: (uuid) => ({
        url: `/employees/${uuid}`,
        method: 'DELETE',
      }),
    }),
    addEmployee: builder.mutation({
      query: (employeeData) => ({
        url: '/employees',
        method: 'POST',
        body: employeeData,
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
} = employeesAPISlice
