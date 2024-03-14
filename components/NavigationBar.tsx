import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSearchQuery,
  setIsSearchLoading,
  setSearchQuery,
} from '@/store/search'
import { useSearchEmployeesQuery } from '@/store/api/searchAPISlice'
import { setEmployees } from '@/store/employees'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { getPaginationData, setPaginationData } from '@/store/ui'

export default function NavigationBar() {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState(null)
  const [employeeLoad, setEmployeeLoad] = useState(true)
  const searchQuery = useSelector(getSearchQuery)
  const paginationData = useSelector(getPaginationData)
  const { limit } = paginationData

  const { data: employeeData } = useGetEmployeesQuery(
    { page: 1, limit: 12 },
    {
      skip: employeeLoad,
    }
  )

  const { data } = useSearchEmployeesQuery(
    {
      page: 1,
      limit: 12,
      query: searchInput,
    },
    {
      skip: !searchInput,
    }
  )

  useEffect(() => {
    if (employeeData) {
      dispatch(setEmployees(employeeData.employees))

      dispatch(
        setPaginationData({
          ...paginationData,
          pageCount: Math.ceil(employeeData.totalCount / limit),
          totalCount: employeeData.totalCount,
        })
      )
    }
  }, [employeeData])

  useEffect(() => {
    if (data) {
      dispatch(setIsSearchLoading(false))
      dispatch(setEmployees(data))

      dispatch(
        setPaginationData({
          ...paginationData,
          pageCount: 1,
        })
      )
    }
  }, [data])

  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if ((e.target as HTMLInputElement).value !== searchQuery) {
        dispatch(setSearchQuery(null))
        setSearchInput(null)
        dispatch(setSearchQuery((e.target as HTMLInputElement).value))
        setSearchInput((e.target as any).value as React.SetStateAction<null>)
        dispatch(setIsSearchLoading(true))
      }

      if ((e.target as HTMLInputElement).value === '') {
        dispatch(setSearchQuery(null))
        setSearchInput(null)
        dispatch(setIsSearchLoading(false))
        setEmployeeLoad(false)
      }
    }
  }

  return (
    <Flex
      className="w-full items-center justify-between border-b px-4 py-10 text-lg"
      style={{ height: '7.5vh' }}
    >
      <Flex className="gap-6">
        <Button isActive>Employees</Button>
        <Button>Departments</Button>
        <Button>Projects</Button>
      </Flex>

      <Flex className="w-1/3">
        <InputGroup>
          <InputRightElement children={<SearchIcon />} pointerEvents="none" />

          <Input
            autoFocus
            type="text"
            className="m-0 bg-transparent pl-2"
            placeholder="Search..."
            size="md"
            onKeyPress={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Flex>
    </Flex>
  )
}
