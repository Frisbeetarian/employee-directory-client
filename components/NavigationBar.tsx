import { Button, Flex } from '@chakra-ui/react'

export default function NavigationBar() {
  return (
    <Flex
      className="w-full items-center gap-6  border-b px-4 py-10 text-lg"
      style={{ height: '7.5vh' }}
    >
      <Button isActive>Employees</Button>
      <Button>Departments</Button>
      <Button>Projects</Button>
    </Flex>
  )
}