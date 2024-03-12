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
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchDepartmentEmployees,
  setShouldFetchEmployees,
} from '@/store/ui'
import { setEmployees } from '@/store/employees'
import { useGetEmployeesByDepartmentUuidQuery } from '@/store/api/departmentsAPISlice'
import { getSelectedDepartment } from '@/store/departments'

export default function Footer() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)
  const shouldFetchEmployees = useSelector(getShouldFetchEmployees)
  const activeIndex = useSelector(getActiveIndex)
  const selectedDepartmentUuid = useSelector(getSelectedDepartment)
  const shouldFetchDepartmentEmployees = useSelector(
    getShouldFetchDepartmentEmployees
  )

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

  useEffect(() => {
    if (
      employeesByDepartment?.employees &&
      employeesByDepartment?.employees?.length !== 0
    ) {
      dispatch(setEmployees(employeesByDepartment.employees))

      dispatch(
        setPaginationData({
          ...paginationData,
          pageCount: Math.ceil(employeesByDepartment.totalCount / limit),
          totalCount: employeesByDepartment.totalCount,
        })
      )
    }
  }, [employeesByDepartment, isEmployeesByDepartmentLoading])

  useEffect(() => {
    dispatch(setIsEmployeeDataLoading(true))

    if (data?.employees && data?.employees?.length !== 0) {
      dispatch(setEmployees(data.employees))
      dispatch(setIsEmployeeDataLoading(false))

      dispatch(
        setPaginationData({
          ...paginationData,
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
    } else if (activeIndex === 'departments') {
      dispatch(setShouldFetchDepartmentEmployees(true))
      dispatch(setShouldFetchEmployees(false))
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
