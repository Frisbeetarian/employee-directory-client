import React from 'react'
import { Avatar, Flex } from '@chakra-ui/react'

export default function Employee() {
  return (
    <Flex className="my-4 w-full items-center gap-12">
      <Flex className="items-center">
        <Avatar size="md" bg="red.500" className="mr-2" />
        <p className="text-lg ">name</p>
      </Flex>
      <p>Title</p>
      <p>Departments</p>
      <p>Location</p>
    </Flex>
  )
}
