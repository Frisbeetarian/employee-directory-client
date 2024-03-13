import React, { useEffect } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react'

import Sidebar from '@/components/Sidebar'
import NavigationBar from '@/components/NavigationBar'
import ContentArea from '@/components/ContentArea'
import { useDispatch, useSelector } from 'react-redux'
import { useGetEmployeesQuery } from '@/store/api/employeesAPISlice'
import { getSelectedEmployee, setEmployees } from '@/store/employees'
import {
  getIsDrawerOpen,
  setIsDrawerOpen,
  setIsEmployeeDataLoading,
  setPaginationData,
} from '@/store/ui'
import Footer from '@/components/Footer'

export default function Home() {
  const dispatch = useDispatch()
  const isDrawerOpen = useSelector(getIsDrawerOpen)
  const selectedEmployee = useSelector(getSelectedEmployee)

  return (
    <Flex className="min-h-screen overflow-x-hidden">
      <Sidebar />
      <Flex className="min-h-screen w-full flex-col">
        <NavigationBar />

        <ContentArea></ContentArea>

        <Footer />
        {selectedEmployee ? (
          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={() => dispatch(setIsDrawerOpen(false))}
            size="lg"
            // finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{selectedEmployee.name}</DrawerHeader>

              <DrawerBody>
                <Text>{selectedEmployee.name}</Text>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={() => {
                    dispatch(setIsDrawerOpen(false))
                  }}
                >
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  )
}
