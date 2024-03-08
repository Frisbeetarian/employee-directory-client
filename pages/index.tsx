import React from 'react'
import { Flex } from '@chakra-ui/react'

import Sidebar from '@/components/Sidebar'
import NavigationBar from '@/components/NavigationBar'
import ContentArea from '@/components/ContentArea'

export default function Home() {
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
