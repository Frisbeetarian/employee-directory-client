import React from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/components/Employee'
import { useSelector } from 'react-redux'
import { getEmployees } from '@/store/employees'
import { getIsEmployeeDataLoading } from '@/store/ui'
import { getIsSearchLoading } from '@/store/search'

export default function ContentArea() {
  const employees = useSelector(getEmployees)
  const isEmployeeDataLoading = useSelector(getIsEmployeeDataLoading)
  const isSearchLoading = useSelector(getIsSearchLoading)

  return (
    <Flex
      className="h-full w-full flex-col overflow-y-auto px-4 py-5 pr-10"
      style={{ width: '85vw', maxHeight: '85vh' }}
    >
      {isEmployeeDataLoading || isSearchLoading ? (
        <div>Loading...</div>
      ) : (
        employees?.map((employee) => (
          <Employee key={employee.uuid} employee={employee} />
        ))
      )}
    </Flex>
  )
}
