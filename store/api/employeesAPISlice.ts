import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeesAPISlice = createApi({
  reducerPath: 'api/employees',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employees',
      providesTags: ['Employee'],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
})

export const { useGetEmployeesQuery, useRegisterUserMutation } =
  employeesAPISlice
