import React from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'

export default function Employee({ employee }) {
  return (
    <Flex className="my-4 w-full items-center">
      <Flex className="items-center" width="30%">
        <Avatar size="md" bg="red.500" className="mr-2" />
        <Text className="text-lg ">{employee.name}</Text>
      </Flex>
      <Text width="25%">{employee.jobTitle}</Text>
      <Text width="25%">Departments</Text>
      <Text width="20%">Location</Text>
    </Flex>
  )
}
