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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Tag,
  HStack,
  TagLeftIcon,
  TagLabel,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSkills } from '@/store/skills'
import { AddIcon } from '@chakra-ui/icons'
import { getDepartments } from '@/store/departments'
import { getProjects } from '@/store/projects'

export default function AppModal() {
  const dispatch = useDispatch()
  const isEmployeeModalOpen = useSelector(getIsAddEmployeeModalOpen)
  const departments = useSelector(getDepartments)
  const projects = useSelector(getProjects)
  const skills = useSelector(getSkills)
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
            selectedDepartments: [],
            selectedProjects: [],
            selectedSkills: [],
          }}
          onSubmit={(values, actions) => {
            console.log(values)
            actions.setSubmitting(false)
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
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
