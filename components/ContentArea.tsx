import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/components/Employee'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { useDispatch } from 'react-redux'
import { setEmployees } from '@/store/employees'

export default function ContentArea() {
  const dispatch = useDispatch()
  const { data: employees, isLoading } = useGetEmployeesQuery(undefined)

  useEffect(() => {
    console.log(employees)
    if (employees) {
      dispatch(setEmployees(employees))
    }
  }, [employees])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
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
