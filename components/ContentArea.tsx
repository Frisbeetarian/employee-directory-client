import React from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/components/Employee'
import { useSelector } from 'react-redux'
import { getEmployees } from '@/store/employees'
import { getIsEmployeeDataLoading } from '@/store/ui'

export default function ContentArea() {
  const employees = useSelector(getEmployees)
  const isEmployeeDataLoading = useSelector(getIsEmployeeDataLoading)

  return isEmployeeDataLoading ? (
    <div>Loading...</div>
  ) : (
    <Flex
      className="h-full w-full flex-col overflow-y-auto px-4 py-5 pr-10"
      style={{ width: '85vw', maxHeight: '85vh' }}
    >
      {employees?.map((employee) => (
        <Employee key={employee.uuid} employee={employee} />
      ))}
    </Flex>
  )
}
