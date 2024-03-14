import React from 'react'
import { Avatar, Flex, Text, Box } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setIsDrawerOpen } from '@/store/ui'
import { setSelectedEmployee } from '@/store/employees'

// @ts-ignore
export default function Employee({ employee }) {
  const dispatch = useDispatch()

  return (
    <Flex
      className="my-2 w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-300 "
      onClick={() => {
        dispatch(setIsDrawerOpen(true))
        dispatch(setSelectedEmployee(employee))
      }}
    >
      <Flex className="items-center " width="20%">
        <Avatar size="md" bg="red.500" className="mr-2" />
        <Text className="text-lg ">{employee.name}</Text>
      </Flex>

      <Text width="20%" className="">
        {employee.jobTitle}
      </Text>

      <Flex className="flex-col " width="20%">
        {employee?.departments?.map((department: any) => (
          <Box key={department.uuid} className="inline " display="inline">
            <Text>{department.name}</Text>
          </Box>
        ))}
      </Flex>

      <Flex className="flex-col " width="20%">
        {employee?.skills?.map((skill: any) => (
          <Text key={skill.uuid}>{skill.name}</Text>
        ))}
      </Flex>

      <Flex className="flex-col " width="20%">
        {employee?.locations?.map((location: any) => (
          <Text className="" key={location.uuid}>
            {location.name}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}
