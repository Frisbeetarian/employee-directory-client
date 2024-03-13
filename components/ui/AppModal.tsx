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
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { getSkills } from '@/store/skills'
import { AddIcon } from '@chakra-ui/icons'
import { getDepartments } from '@/store/departments'
import { getProjects } from '@/store/projects'
import { getLocations } from '@/store/locations'

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  jobTitle: Yup.string().required('Job title is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
})
export default function AppModal() {
  const dispatch = useDispatch()
  const isEmployeeModalOpen = useSelector(getIsAddEmployeeModalOpen)
  const departments = useSelector(getDepartments)
  const projects = useSelector(getProjects)
  const skills = useSelector(getSkills)
  const locations = useSelector(getLocations)
  const toast = useToast()

  const handleDepartmentSelected = (
    departmentUuid,
    selectedDepartments,
    setFieldValue
  ) => {
    let newSelectedDepartments = [...selectedDepartments]

    if (newSelectedDepartments.includes(departmentUuid)) {
      newSelectedDepartments = newSelectedDepartments.filter(
        (id) => id !== departmentUuid
      )
    } else if (newSelectedDepartments.length < 3) {
      newSelectedDepartments.push(departmentUuid)
    } else {
      toast({
        title: 'A maximum of 3 departments can be selected',
        description: 'Please deselect a department to select another',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }

    setFieldValue('selectedDepartments', newSelectedDepartments)
  }

  const handleProjectSelected = (
    projectUuid,
    selectedProjects,
    setFieldValue
  ) => {
    let newSelectedProjects = [...selectedProjects]

    if (newSelectedProjects.includes(projectUuid)) {
      newSelectedProjects = newSelectedProjects.filter(
        (id) => id !== projectUuid
      )
    } else if (newSelectedProjects.length < 3) {
      newSelectedProjects.push(projectUuid)
    } else {
      toast({
        title: 'A maximum of 3 projects can be selected',
        description: 'Please deselect a project to select another',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }

    setFieldValue('selectedProjects', newSelectedProjects)
  }

  const handleSkillSelected = (skillUuid, selectedSkills, setFieldValue) => {
    let newSelectedSkills = [...selectedSkills]

    if (newSelectedSkills.includes(skillUuid)) {
      newSelectedSkills = newSelectedSkills.filter((id) => id !== skillUuid)
    } else if (newSelectedSkills.length < 5) {
      newSelectedSkills.push(skillUuid)
    } else {
      toast({
        title: 'A maximum of 5 skills can be selected',
        description: 'Please deselect a skill to select another',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }

    setFieldValue('selectedSkills', newSelectedSkills)
  }

  const handleLocationSelected = (
    locationUuid,
    selectedLocations,
    setFieldValue
  ) => {
    let newSelectedLocations = [...selectedLocations]

    if (newSelectedLocations.includes(locationUuid)) {
      newSelectedLocations = newSelectedLocations.filter(
        (id) => id !== locationUuid
      )
    } else if (newSelectedLocations.length < 2) {
      newSelectedLocations.push(locationUuid)
    } else {
      toast({
        title: 'A maximum of 2 locations can be selected',
        description: 'Please deselect a location to select another',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }

    setFieldValue('selectedLocations', newSelectedLocations)
  }
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
            phoneNumber: '',
            jobTitle: '',
            selectedDepartments: [],
            selectedProjects: [],
            selectedSkills: [],
            selectedLocations: [],
          }}
          validationSchema={EmployeeSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            actions.setSubmitting(false)
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              <ModalBody className="flex gap-4">
                <Flex className="w-1/2 flex-col gap-y-4">
                  <FormControl isInvalid={touched.name && !!errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                    {touched.name && errors.name && (
                      <Text color="red.500">{errors.name}</Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={touched.email && !!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="text" />
                    {touched.email && errors.email && (
                      <Text color="red.500">{errors.email}</Text>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                  >
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Field
                      as={Input}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text color="red.500">{errors.phoneNumber}</Text>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={touched.jobTitle && !!errors.jobTitle}
                  >
                    <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                    <Field
                      as={Input}
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                    />
                    {touched.jobTitle && errors.jobTitle && (
                      <Text color="red.500">{errors.jobTitle}</Text>
                    )}
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

                <Flex className="w-1/2 flex-col">
                  <Flex className=" flex-col  ">
                    <Text className="font-bold">Departments</Text>

                    <Flex className="max-h-40 flex-wrap gap-2 overflow-y-scroll rounded-sm bg-gray-300 p-2">
                      {departments.map((department) => (
                        <Tag
                          className="cursor-pointer"
                          size="sm"
                          key={department.uuid}
                          variant={
                            values.selectedDepartments.includes(department.uuid)
                              ? 'solid'
                              : 'subtle'
                          }
                          colorScheme={
                            values.selectedDepartments.includes(department.uuid)
                              ? 'green'
                              : 'gray'
                          }
                          onClick={() =>
                            handleDepartmentSelected(
                              department.uuid,
                              values.selectedDepartments,
                              setFieldValue
                            )
                          }
                          _hover={{ background: 'gray.400' }}
                        >
                          <TagLeftIcon boxSize="12px" as={AddIcon} />
                          <TagLabel>{department.name}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>

                    <Flex className="mt-5 flex-col">
                      <Text className="font-bold">Projects</Text>

                      <Flex className="max-h-40 flex-wrap gap-2 overflow-y-scroll rounded-sm bg-gray-300 p-2">
                        {projects.map((project) => (
                          <Tag
                            className="cursor-pointer"
                            size="sm"
                            key={project.uuid}
                            variant={
                              values.selectedProjects.includes(project.uuid)
                                ? 'solid'
                                : 'subtle'
                            }
                            colorScheme={
                              values.selectedProjects.includes(project.uuid)
                                ? 'green'
                                : 'gray'
                            }
                            onClick={() =>
                              handleProjectSelected(
                                project.uuid,
                                values.selectedProjects,
                                setFieldValue
                              )
                            }
                            _hover={{ background: 'gray.400' }}
                          >
                            <TagLeftIcon boxSize="12px" as={AddIcon} />
                            <TagLabel>{project.name}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>
                    </Flex>

                    <Flex className="mt-5 flex-col">
                      <Text className="font-bold">Skills</Text>

                      <Flex className="max-h-40 flex-wrap gap-2 overflow-y-scroll rounded-sm bg-gray-300 p-2">
                        {skills.map((skill) => (
                          <Tag
                            className="cursor-pointer"
                            size="sm"
                            key={skill.uuid}
                            variant={
                              values.selectedSkills.includes(skill.uuid)
                                ? 'solid'
                                : 'subtle'
                            }
                            colorScheme={
                              values.selectedSkills.includes(skill.uuid)
                                ? 'green'
                                : 'gray'
                            }
                            onClick={() =>
                              handleSkillSelected(
                                skill.uuid,
                                values.selectedSkills,
                                setFieldValue
                              )
                            }
                            _hover={{ background: 'gray.400' }}
                          >
                            <TagLeftIcon boxSize="12px" as={AddIcon} />
                            <TagLabel>{skill.name}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>
                    </Flex>

                    <Flex className="mt-5 flex-col">
                      <Text className="font-bold">Locations</Text>

                      <Flex className="max-h-40 flex-wrap gap-2 overflow-y-scroll rounded-sm bg-gray-300 p-2">
                        {locations.map((location) => (
                          <Tag
                            className="cursor-pointer"
                            size="sm"
                            key={location.uuid}
                            variant={
                              values.selectedLocations.includes(location.uuid)
                                ? 'solid'
                                : 'subtle'
                            }
                            colorScheme={
                              values.selectedLocations.includes(location.uuid)
                                ? 'green'
                                : 'gray'
                            }
                            onClick={() =>
                              handleLocationSelected(
                                location.uuid,
                                values.selectedLocations,
                                setFieldValue
                              )
                            }
                            _hover={{ background: 'gray.400' }}
                          >
                            <TagLeftIcon boxSize="12px" as={AddIcon} />
                            <TagLabel>{location.city}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
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
