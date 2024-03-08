import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'

import Sidebar from '@/components/Sidebar'
import NavigationBar from '@/components/NavigationBar'
import ContentArea from '@/components/ContentArea'
import { useDispatch } from 'react-redux'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { setEmployees } from '@/store/employees'

export default function Home() {
  const dispatch = useDispatch()
  const { data: employees, isLoading } = useGetEmployeesQuery(undefined)

  useEffect(() => {
    if (employees) {
      dispatch(setEmployees(employees))
    }
  }, [employees])

  return (
    <Flex className="min-h-screen ">
      <Sidebar />
      <Flex className="min-h-screen w-full flex-col">
        <NavigationBar />
        <ContentArea></ContentArea>
      </Flex>
    </Flex>
  )
}
