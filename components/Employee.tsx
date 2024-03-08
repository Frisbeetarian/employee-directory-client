import React from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'

export default function Employee({ employee }) {
  return (
    <Flex className="my-4 w-full items-center justify-between">
      <Flex className="items-center">
        <Avatar size="md" bg="red.500" className="mr-2" />
        <Text className="text-lg ">{employee.name}</Text>
      </Flex>

      <Text>{employee.jobTitle}</Text>

      <Text>{employee.email}</Text>

      <Text>
        {employee.departments.map((department) => (
          <Flex key={department.uuid}>{department.name}</Flex>
        ))}
      </Text>

      <Text>
        {employee.skills.map((skill) => (
          <Flex key={skill.uuid}>{skill.name}</Flex>
        ))}
      </Text>

      <Flex className="flex-col">
        {employee.locations.map((location) => (
          <Flex key={location.uuid}>{location.name}</Flex>
        ))}
      </Flex>
    </Flex>
  )
}
