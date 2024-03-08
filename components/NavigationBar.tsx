import { Flex } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

export default function NavigationBar() {
  return (
    <Flex className="w-full items-center gap-6 bg-gray-300 px-4 py-2 text-lg">
      <Link href="/" color="blue.400" _hover={{ color: 'blue.500' }}>
        Home
      </Link>

      <Link href="/about" color="blue.400" _hover={{ color: 'blue.500' }}>
        About
      </Link>
    </Flex>
  )
}
