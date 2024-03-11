import React from 'react'
import { Avatar, Flex, Text, Box } from '@chakra-ui/react'

export default function Employee({ employee }) {
  return (
    <Flex className="my-4 w-full items-center">
      <Flex className="items-center" width="20%">
        <Avatar size="md" bg="red.500" className="mr-2" />
        <Text className="text-lg ">{employee.name}</Text>
      </Flex>

      <Text width="20%">{employee.jobTitle}</Text>

      <Flex className="flex-col" width="20%">
        {employee?.departments?.map((department) => (
          <Box
            key={department.uuid}
            className="inline border-b"
            display="inline"
          >
            <Text>{department.name}</Text>
          </Box>
        ))}
      </Flex>

      <Flex className="flex-col" width="20%">
        {employee?.skills?.map((skill) => (
          <Text key={skill.uuid}>{skill.name}</Text>
        ))}
      </Flex>

      <Flex className="flex-col" width="20%">
        {employee?.locations?.map((location) => (
          <Text className="" key={location.uuid}>
            {location.name}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}
