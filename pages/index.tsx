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
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

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
  getIsAddEmployeeModalOpen,
  getIsDrawerOpen,
  setIsAddEmployeeModalOpen,
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
  const isEmployeeModalOpen = useSelector(getIsAddEmployeeModalOpen)
  const toast = useToast()

  const handleDelete = async () => {
    if (selectedEmployee?.uuid) {
      try {
        await deleteEmployee(selectedEmployee.uuid).unwrap()
        dispatch(removeEmployee(selectedEmployee.uuid))
        dispatch(setIsDrawerOpen(false))

        toast({
          title: 'Employee deleted',
          description: `${selectedEmployee.name} has been successfully deleted.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
      } catch (error) {
        console.log(error)

        toast({
          title: 'Error deleting employee',
          description:
            'There was an error deleting the employee. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
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

        <Modal
          isOpen={isEmployeeModalOpen}
          onClose={() => dispatch(setIsAddEmployeeModalOpen(false))}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Employee</ModalHeader>
            <ModalCloseButton />
            <Formik
              initialValues={{
                name: '',
                email: '',
                jobTitle: '',
                department: '',
              }}
              onSubmit={(values, actions) => {
                console.log(values)
                actions.setSubmitting(false)
              }}
            >
              {(props) => (
                <Form>
                  <ModalBody>
                    <Flex className="flex-col gap-y-4">
                      <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field as={Input} id="name" name="name" type="text" />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Field as={Input} id="email" name="email" type="text" />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="phoneNumber">
                          Phone Number
                        </FormLabel>
                        <Field
                          as={Input}
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                        <Field
                          as={Input}
                          id="jobTitle"
                          name="jobTitle"
                          type="text"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="hireDate">Hire Date</FormLabel>
                        <Field
                          as={Input}
                          id="hireDate"
                          name="hireDate"
                          type="text"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="biography">Biography</FormLabel>
                        <Field
                          as={Input}
                          id="biography"
                          name="biography"
                          type="text"
                        />
                      </FormControl>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    {/*<Button*/}
                    {/*  variant="ghost"*/}
                    {/*  mr={3}*/}
                    {/*  onClose={() => dispatch(setIsAddEmployeeModalOpen(false))}*/}
                    {/*>*/}
                    {/*  Close*/}
                    {/*</Button>*/}
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Add employee
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>

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
