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
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from '@/store/api/employeesAPISlice'
import {
  getSelectedEmployee,
  removeEmployee,
  setEmployees,
} from '@/store/employees'
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
  const [deleteEmployee, { isLoading: isDeleting, isSuccess }] =
    useDeleteEmployeeMutation()

  const handleDelete = async () => {
    if (selectedEmployee?.uuid) {
      try {
        await deleteEmployee(selectedEmployee.uuid).unwrap()
        dispatch(removeEmployee(selectedEmployee.uuid))
        dispatch(setIsDrawerOpen(false))
      } catch (error) {
        console.log(error)
      }
    }
  }

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
            size="xl"
            // finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{selectedEmployee.name}</DrawerHeader>

              <DrawerBody className="flex  flex-col gap-6">
                <Flex>
                  <Text className="font-bold">Name:&nbsp;</Text>
                  <Text>{selectedEmployee.name}</Text>
                </Flex>

                <Flex>
                  <Text className="font-bold">Email:&nbsp;</Text>
                  <Text>{selectedEmployee.email}</Text>
                </Flex>

                <Flex>
                  <Text className="font-bold">Phone number:&nbsp;</Text>
                  <Text>{selectedEmployee.phoneNumber}</Text>
                </Flex>

                <Flex>
                  <Text className="font-bold">Job title:&nbsp;</Text>
                  <Text>{selectedEmployee.jobTitle}</Text>
                </Flex>

                <Flex>
                  <Text className="font-bold">Hire date:&nbsp;</Text>
                  <Text>{selectedEmployee.hireDate}</Text>
                </Flex>

                <Flex>
                  <Text className="font-bold">Biography:&nbsp;</Text>
                  <Text>{selectedEmployee.biography}</Text>
                </Flex>

                <Flex className="mt-5 w-full justify-between">
                  <Flex className="flex-col">
                    <Text className="font-bold">Departments</Text>
                    {selectedEmployee?.departments?.map((department) => (
                      <Text key={department.uuid}>{department.name}</Text>
                    ))}
                  </Flex>

                  <Flex className="flex-col">
                    <Text className="font-bold">Locations</Text>
                    {selectedEmployee?.locations?.map((location) => (
                      <Text key={location.uuid}>{location.name}</Text>
                    ))}
                  </Flex>

                  <Flex className="flex-col">
                    <Text className="font-bold">Projects</Text>
                    {selectedEmployee?.projects?.map((project) => (
                      <Text key={project.uuid}>{project.name}</Text>
                    ))}
                  </Flex>

                  <Flex className="flex-col">
                    <Text className="font-bold">Skills</Text>
                    {selectedEmployee?.skills?.map((skill) => (
                      <Text key={skill.uuid}>{skill.name}</Text>
                    ))}
                  </Flex>
                </Flex>
              </DrawerBody>

              <DrawerFooter>
                <Flex className="w-full justify-between">
                  <Button
                    variant="outline"
                    colorScheme="red"
                    mr={3}
                    onClick={handleDelete}
                    isLoading={isDeleting}
                  >
                    Delete employee record
                  </Button>
                  <Button colorScheme="blue">Edit</Button>
                </Flex>
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
