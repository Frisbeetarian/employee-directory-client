import {
  getIsAddEmployeeModalOpen,
  setIsAddEmployeeModalOpen,
} from '@/store/ui'
import {
  Button,
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
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AppModal() {
  const dispatch = useDispatch()
  const isEmployeeModalOpen = useSelector(getIsAddEmployeeModalOpen)

  return (
    <Modal
      isOpen={isEmployeeModalOpen}
      onClose={() => dispatch(setIsAddEmployeeModalOpen(false))}
      size="4xl"
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
              <ModalBody className="flex gap-4">
                <Flex className="w-1/2 flex-col gap-y-4">
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="text" />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
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

                <Flex>Skills</Flex>
              </ModalBody>

              <ModalFooter>
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
  )
}
