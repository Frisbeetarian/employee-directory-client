import { Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'

export default function NavigationBar() {
    return (
        <Flex className="items-center py-2">
            <Link href='/' color='blue.400' _hover={{ color: 'blue.500' }}>
                Home
            </Link>

            <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
                About
            </Link>
        </Flex>
    )
}
