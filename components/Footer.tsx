import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { getEmployees } from '@/store/employees'
import { Flex } from '@chakra-ui/react'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'

export default function Footer() {
  // const employees = useSelector(getEmployees)

  const [page, setPage] = React.useState(1)
  const limit = 12

  const { data, isLoading } = useGetEmployeesQuery({
    page,
    limit,
  })

  const handlePageClick = (event) => {
    const newPage = event.selected + 1
    setPage(newPage)
  }

  console.log('data', data)

  // const { employees, currentPage, totalPages, totalCount } = data
  // const pageCount = Math.ceil(totalCount / limit)

  // console.log('employeesResponse', employees)
  // console.log('pageCount', pageCount)

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
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </Flex>
  )
}
