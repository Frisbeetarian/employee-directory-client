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
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSkills } from '@/store/skills'
import { AddIcon } from '@chakra-ui/icons'

export default function AppModal() {
  const dispatch = useDispatch()
  const isEmployeeModalOpen = useSelector(getIsAddEmployeeModalOpen)
  const skills = useSelector(getSkills)

  const handleSkillSelected = (skillUuid, selectedSkills, setFieldValue) => {
    let newSelectedSkills = [...selectedSkills]

    if (newSelectedSkills.includes(skillUuid)) {
      newSelectedSkills = newSelectedSkills.filter((id) => id !== skillUuid)
    } else if (newSelectedSkills.length < 5) {
      newSelectedSkills.push(skillUuid)
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
                  <Flex className="flex-col">
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

                  <Flex className="flex-col">
                    <Text className="font-bold">Departments</Text>

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
