import React, { ReactDOM, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'

import Sidebar from '@/components/Sidebar'
import NavigationBar from '@/components/NavigationBar'
import ContentArea from '@/components/ContentArea'
import { useDispatch } from 'react-redux'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { setEmployees } from '@/store/employees'
import { setIsEmployeeDataLoading, setPaginationData } from '@/store/ui'
import Footer from '@/components/Footer'

export default function Home() {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetEmployeesQuery(1, 12)

  useEffect(() => {
    dispatch(setIsEmployeeDataLoading(true))

    if (data?.employees && data?.employees?.length !== 0) {
      dispatch(setEmployees(data.employees))
      dispatch(setIsEmployeeDataLoading(false))
      dispatch(
        setPaginationData({
          page: data.currentPage,
          limit: 12,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
        })
      )
    }
  }, [isLoading])

  return (
    <Flex className="min-h-screen overflow-x-hidden">
      <Sidebar />
      <Flex className="min-h-screen w-full flex-col">
        <NavigationBar />

        <ContentArea></ContentArea>

        <Footer />
      </Flex>
    </Flex>
  )
}
