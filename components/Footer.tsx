import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import {
  getActiveIndex,
  getPaginationData,
  getShouldFetchDepartmentEmployees,
  getShouldFetchEmployees,
  getShouldFetchLocationEmployees,
  getShouldFetchProjectEmployees,
  getShouldFetchSkillEmployees,
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchDepartmentEmployees,
  setShouldFetchEmployees,
  setShouldFetchLocationEmployees,
  setShouldFetchProjectEmployees,
  setShouldFetchSkillEmployees,
} from '@/store/ui'
import { setEmployees } from '@/store/employees'
import { useGetEmployeesByDepartmentUuidQuery } from '@/store/api/departmentsAPISlice'
import { getSelectedDepartment } from '@/store/departments'
import { useGetEmployeesByLocationUuidQuery } from '@/store/api/locationsAPISlice'
import { getSelectedLocation } from '@/store/locations'
import { useGetEmployeesByProjectUuidQuery } from '@/store/api/projectsAPISlice'
import { getSelectedProject } from '@/store/projects'
import { getSelectedSkill } from '@/store/skills'
import { useGetEmployeesBySkillUuidQuery } from '@/store/api/skillsAPISlice'

export default function Footer() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)
  const shouldFetchEmployees = useSelector(getShouldFetchEmployees)
  const activeIndex = useSelector(getActiveIndex)
  const selectedDepartmentUuid = useSelector(getSelectedDepartment)
  const selectedLocationUuid = useSelector(getSelectedLocation)
  const selectedProjectUuid = useSelector(getSelectedProject)
  const selectedSkillUuid = useSelector(getSelectedSkill)

  const shouldFetchDepartmentEmployees = useSelector(
    getShouldFetchDepartmentEmployees
  )
  const shouldFetchLocationEmployees = useSelector(
    getShouldFetchLocationEmployees
  )
  const shouldFetchProjectEmployees = useSelector(
    getShouldFetchProjectEmployees
  )
  const shouldFetchSkillEmployees = useSelector(getShouldFetchSkillEmployees)

  const { page, limit } = paginationData

  const { data, isLoading } = useGetEmployeesQuery(
    { page, limit },
    { skip: !shouldFetchEmployees }
  )

  const {
    data: employeesByDepartment,
    isLoading: isEmployeesByDepartmentLoading,
  } = useGetEmployeesByDepartmentUuidQuery(
    { departmentUuid: selectedDepartmentUuid, page, limit },
    {
      skip: !shouldFetchDepartmentEmployees,
    }
  )

  const { data: employeesByLocation, isLoading: isEmployeesByLocationLoading } =
    useGetEmployeesByLocationUuidQuery(
      { locationUuid: selectedLocationUuid, page, limit },
      {
        skip: true,
      }
    )

  const { data: employeesByProject, isLoading: isEmployeesByProjectLoading } =
    useGetEmployeesByProjectUuidQuery(
      { projectUuid: selectedProjectUuid, page, limit },
      {
        skip: !shouldFetchProjectEmployees,
      }
    )

  const { data: employeesBySkill, isLoading: isEmployeesBySkillLoading } =
    useGetEmployeesBySkillUuidQuery(
      { skillUuid: selectedSkillUuid, page, limit },
      {
        skip: !shouldFetchSkillEmployees,
      }
    )

  useEffect(() => {
    if (
      employeesByLocation?.employees &&
      employeesByLocation?.employees?.length !== 0
    ) {
      dispatch(setEmployees(employeesByLocation.employees))

      dispatch(
        setPaginationData({
          page: employeesByLocation.currentPage,
          limit: 12,
          pageCount: Math.ceil(employeesByLocation.totalCount / limit),
          totalCount: employeesByLocation.totalCount,
        })
      )
    }
  }, [employeesByLocation, isEmployeesByLocationLoading])

  useEffect(() => {
    if (
      employeesByDepartment?.employees &&
      employeesByDepartment?.employees?.length !== 0
    ) {
      dispatch(setEmployees(employeesByDepartment.employees))
      dispatch(setShouldFetchDepartmentEmployees(false))

      dispatch(
        setPaginationData({
          page: employeesByDepartment.currentPage,
          limit: 12,
          pageCount: Math.ceil(employeesByDepartment.totalCount / limit),
          totalCount: employeesByDepartment.totalCount,
        })
      )
    }
  }, [employeesByDepartment, isEmployeesByDepartmentLoading])

  useEffect(() => {
    if (
      employeesByProject?.employees &&
      employeesByProject?.employees?.length !== 0
    ) {
      dispatch(setEmployees(employeesByProject.employees))

      dispatch(
        setPaginationData({
          page: employeesByProject.currentPage,
          limit: 12,
          pageCount: Math.ceil(employeesByProject.totalCount / limit),
          totalCount: employeesByProject.totalCount,
        })
      )
    }
  }, [employeesByProject, isEmployeesByProjectLoading])

  useEffect(() => {
    if (
      employeesBySkill?.employees &&
      employeesBySkill?.employees?.length !== 0
    ) {
      dispatch(setEmployees(employeesBySkill.employees))

      dispatch(
        setPaginationData({
          page: employeesBySkill.currentPage,
          limit: 12,
          pageCount: Math.ceil(employeesBySkill.totalCount / limit),
          totalCount: employeesBySkill.totalCount,
        })
      )
    }
  }, [employeesBySkill, isEmployeesBySkillLoading])

  useEffect(() => {
    dispatch(setIsEmployeeDataLoading(true))

    if (data?.employees && data?.employees?.length !== 0) {
      dispatch(setEmployees(data.employees))
      dispatch(setIsEmployeeDataLoading(false))

      dispatch(
        setPaginationData({
          page: data.currentPage,
          limit: 12,
          pageCount: Math.ceil(data.totalCount / limit),
          totalCount: data.totalCount,
        })
      )
    }
  }, [data, isLoading])

  const handlePageClick = (event) => {
    const newPage = event.selected + 1
    if (activeIndex === 'employees') {
      dispatch(setShouldFetchEmployees(true))
      dispatch(setShouldFetchDepartmentEmployees(false))
      dispatch(setShouldFetchLocationEmployees(false))
      dispatch(setShouldFetchProjectEmployees(false))
      dispatch(setShouldFetchSkillEmployees(false))
    } else if (activeIndex === 'departments') {
      dispatch(setShouldFetchDepartmentEmployees(true))
      dispatch(setShouldFetchEmployees(false))
      dispatch(setShouldFetchLocationEmployees(false))
      dispatch(setShouldFetchProjectEmployees(false))
      dispatch(setShouldFetchSkillEmployees(false))
    } else if (activeIndex === 'locations') {
      dispatch(setShouldFetchLocationEmployees(true))
      dispatch(setShouldFetchEmployees(false))
      dispatch(setShouldFetchDepartmentEmployees(false))
      dispatch(setShouldFetchProjectEmployees(false))
      dispatch(setShouldFetchSkillEmployees(false))
    } else if (activeIndex === 'projects') {
      dispatch(setShouldFetchProjectEmployees(true))
      dispatch(setShouldFetchEmployees(false))
      dispatch(setShouldFetchDepartmentEmployees(false))
      dispatch(setShouldFetchLocationEmployees(false))
      dispatch(setShouldFetchSkillEmployees(false))
    } else if (activeIndex === 'skills') {
      dispatch(setShouldFetchSkillEmployees(true))
      dispatch(setShouldFetchEmployees(false))
      dispatch(setShouldFetchDepartmentEmployees(false))
      dispatch(setShouldFetchLocationEmployees(false))
      dispatch(setShouldFetchProjectEmployees(false))
    }

    dispatch(
      setPaginationData({
        ...paginationData,
        page: newPage,
      })
    )
  }

  return (
    <Flex
      className="w-full items-center justify-center border-t"
      style={{ height: '7.5vh' }}
    >
      <ReactPaginate
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={paginationData.pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </Flex>
  )
}
