import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import {
  getPaginationData,
  setIsEmployeeDataLoading,
  setPaginationData,
} from '@/store/ui'
import { setEmployees } from '@/store/employees'

export default function Footer() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)

  const { page, limit } = paginationData

  const { data, isLoading } = useGetEmployeesQuery({ page, limit })

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
        pageCount={paginationData.totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </Flex>
  )
}
