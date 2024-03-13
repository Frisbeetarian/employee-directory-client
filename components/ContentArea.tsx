import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
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
      className="h-full w-full flex-col overflow-y-auto  pb-5 "
      style={{ width: '85vw', maxHeight: '85vh' }}
    >
      <Flex className="sticky z-0 z-10 w-full items-center border-b bg-white px-4 py-4">
        <Text width="20%" align="left" className="">
          Name
        </Text>

        <Text width="20%" align="left" className="">
          Job Title
        </Text>

        <Text width="20%" align="left" className="">
          Departments
        </Text>

        <Text width="20%" align="left" className="">
          Skills
        </Text>

        <Text width="20%" align="left" className=" ">
          Locations
        </Text>
      </Flex>

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
