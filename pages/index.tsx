import { Flex } from '@chakra-ui/react'
import Sidebar from '@/components/Sidebar'
import NavigationBar from '@/components/NavigationBar'

export default function Home() {
  return (
    <Flex className="min-h-screen ">
      <Sidebar />

      <NavigationBar />
    </Flex>
  )
}
