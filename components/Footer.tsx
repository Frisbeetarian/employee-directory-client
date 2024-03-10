import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { getPaginationData, setPaginationData } from '@/store/ui'

export default function Footer() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)

  const handlePageClick = (event) => {
    const newPage = event.selected + 1

    dispatch(
      setPaginationData({
        page: newPage,
        limit: 12,
        totalPages: paginationData.pageCount,
        totalCount: paginationData.totalCount,
      })
    )
  }

  console.log('paginationData.pageCount', paginationData.pageCount)

  // const { employees, currentPage, totalPages, totalCount } = data
  // const pageCount = Math.ceil(totalCount / limit)

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
      />
    </Flex>
  )
}
