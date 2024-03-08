import { Flex } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <Flex className="min-h-screen bg-gray-500 ">
      <Sidebar/>
      <h1>Home</h1>
    </Flex>
  )
}

