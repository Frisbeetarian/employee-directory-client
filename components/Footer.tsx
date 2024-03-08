import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { getEmployees } from '@/store/employees'
import { Flex } from '@chakra-ui/react'

export default function Footer() {
  const employees = useSelector(getEmployees)
  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + 12
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const pageCount = Math.ceil(employees.length / 12)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % employees.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  return (
    <Flex
      className="w-full items-center justify-center border-t "
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
