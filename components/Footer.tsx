import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import {
  getActiveIndex,
  getPaginationData,
  getShouldFetchEmployees,
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchDepartmentEmployees,
  setShouldFetchEmployees,
} from '@/store/ui'
import { setEmployees } from '@/store/employees'
import { useGetEmployeesByDepartmentUuidQuery } from '@/store/api/departmentsAPISlice'

export default function Footer() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)
  const shouldFetchEmployees = useSelector(getShouldFetchEmployees)
  const activeIndex = useSelector(getActiveIndex)

  const { page, limit } = paginationData

  const { data, isLoading } = useGetEmployeesQuery(
    { page, limit },
    { skip: !shouldFetchEmployees }
  )

  const {
    data: employeesByDepartment,
    isLoading: isEmployeesByDepartmentLoading,
  } = useGetEmployeesByDepartmentUuidQuery(
    { departmentUuid: selectedDepartmentUuid, page: 1, limit: 12 },
    {
      skip: !selectedDepartmentUuid,
    }
  )

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
    } else if (activeIndex === 'employeesByDepartment') {
      dispatch(setShouldFetchEmployees(false))
      dispatch(setShouldFetchDepartmentEmployees(true))
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
