import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/components/Employee'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'

export default function ContentArea() {
  const { data: employees, isLoading } = useGetEmployeesQuery(undefined)

  useEffect(() => {
    console.log(employees)
  }, [employees])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Flex className="h-full flex-col px-4 py-5" style={{ width: '80vw' }}>
      {employees?.map((employee) => (
        <Employee key={employee.id} employee={employee} />
      ))}
    </Flex>
  )
}
