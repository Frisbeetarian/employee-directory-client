import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const skillsAPISlice = createApi({
  reducerPath: 'api/skills',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Skill'],
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        url: '/skills',
      }),
      providesTags: ['Skill'],
    }),
    getEmployeesBySkillUuid: builder.query({
      query: ({ skillUuid, page, limit }) => ({
        url: `/skills/${skillUuid}/employees`,
        params: { page, limit },
      }),
      providesTags: ['Skill'],
    }),
  }),
})

export const { useGetSkillsQuery, useGetEmployeesBySkillUuidQuery } =
  skillsAPISlice
