import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSearchQuery,
  setIsSearchLoading,
  setSearchQuery,
} from '@/store/search'

export default function NavigationBar() {
  const dispatch = useDispatch()
  const [, setSearchInput] = useState(null)
  const searchQuery = useSelector(getSearchQuery)

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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if ((e.target as HTMLInputElement).value !== searchQuery) {
                  dispatch(setSearchQuery(null))
                  setSearchInput(null)
                  dispatch(setSearchQuery((e.target as HTMLInputElement).value))
                  setSearchInput(
                    (e.target as any).value as React.SetStateAction<null>
                  )
                  dispatch(setIsSearchLoading(true))
                }
              }
            }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  )
}
