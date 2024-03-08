import React from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/components/Employee'

export default function ContentArea() {
  return (
    <Flex className="h-full flex-col px-4 py-5" style={{ width: '80vw' }}>
      <Employee />
      <Employee />
      <Employee />
      <Employee />
      <Employee />
      <Employee />
    </Flex>
  )
}
