import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { AlignJustify, EditIcon, UserPlus } from 'lucide-react'

import { useGetDepartmentsQuery } from '@/store/api/departmentsAPISlice'
import { useDispatch, useSelector } from 'react-redux'
import { setDepartments, setSelectedDepartment } from '@/store/departments'
import { useGetLocationsQuery } from '@/store/api/locationsAPISlice'
import { setLocations, setSelectedLocation } from '@/store/locations'
import { setProjects, setSelectedProject } from '@/store/projects'
import { useGetProjectsQuery } from '@/store/api/projectsAPISlice'
import { useGetSkillsQuery } from '@/store/api/skillsAPISlice'
import { setSelectedSkill, setSkills } from '@/store/skills'
import {
  getPaginationData,
  setActiveIndex,
  setIsAddEmployeeModalOpen,
  setPaginationData,
  setShouldFetchDepartmentEmployees,
  setShouldFetchEmployees,
  setShouldFetchLocationEmployees,
  setShouldFetchProjectEmployees,
  setShouldFetchSkillEmployees,
} from '@/store/ui'

function Sidebar() {
  const dispatch = useDispatch()
  const paginationData = useSelector(getPaginationData)

  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery()

  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery()

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery()

  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery()
  const [selectedFilter, setSelectedFilter] = useState({ type: '', uuid: '' })

  useEffect(() => {
    dispatch(setDepartments(departmentsData))
  }, [departmentsData])

  useEffect(() => {
    dispatch(setSkills(skillsData))
  }, [skillsData])

  useEffect(() => {
    dispatch(setProjects(projectsData))
  }, [projectsData])

  useEffect(() => {
    dispatch(setLocations(locationsData))
  }, [locationsData])

  function handleDepartmentSelected(departmentUuid) {
    setSelectedFilter({ type: 'departments', uuid: departmentUuid })

    dispatch(setActiveIndex('departments'))

    dispatch(setShouldFetchEmployees(false))
    dispatch(setShouldFetchLocationEmployees(false))
    dispatch(setShouldFetchProjectEmployees(false))
    dispatch(setShouldFetchSkillEmployees(false))
    dispatch(setShouldFetchDepartmentEmployees(true))

    dispatch(setSelectedDepartment(departmentUuid))

    dispatch(
      setPaginationData({
        ...paginationData,
        page: 1,
        limit: 12,
      })
    )
  }

  function handleLocationSelected(locationUuid) {
    setSelectedFilter({ type: 'locations', uuid: locationUuid })

    dispatch(setActiveIndex('locations'))

    dispatch(setShouldFetchEmployees(false))
    dispatch(setShouldFetchDepartmentEmployees(false))
    dispatch(setShouldFetchProjectEmployees(false))
    dispatch(setShouldFetchSkillEmployees(false))
    dispatch(setShouldFetchLocationEmployees(true))

    dispatch(setSelectedLocation(locationUuid))

    dispatch(
      setPaginationData({
        ...paginationData,
        page: 1,
        limit: 12,
      })
    )
  }

  function handleProjectSelected(projectUuid) {
    setSelectedFilter({ type: 'projects', uuid: projectUuid })

    dispatch(setActiveIndex('projects'))

    dispatch(setShouldFetchEmployees(false))
    dispatch(setShouldFetchDepartmentEmployees(false))
    dispatch(setShouldFetchLocationEmployees(false))
    dispatch(setShouldFetchSkillEmployees(false))
    dispatch(setShouldFetchProjectEmployees(true))

    dispatch(setSelectedProject(projectUuid))

    dispatch(
      setPaginationData({
        ...paginationData,
        page: 1,
        limit: 12,
      })
    )
  }

  function handleSkillSelected(skillUuid) {
    setSelectedFilter({ type: 'skills', uuid: skillUuid })

    dispatch(setActiveIndex('skills'))

    dispatch(setShouldFetchEmployees(false))
    dispatch(setShouldFetchDepartmentEmployees(false))
    dispatch(setShouldFetchLocationEmployees(false))
    dispatch(setShouldFetchProjectEmployees(false))
    dispatch(setShouldFetchSkillEmployees(true))

    dispatch(setSelectedSkill(skillUuid))

    dispatch(
      setPaginationData({
        ...paginationData,
        page: 1,
        limit: 12,
      })
    )
  }

  const isFilterSelected = (type, uuid) =>
    selectedFilter.type === type && selectedFilter.uuid === uuid

  return (
    <div
      className="bg-neutral relative box-content flex flex-col scroll-auto border-r text-black"
      style={{ width: '15vw', minWidth: '15vw', height: '100vh' }}
    >
      <Flex
        className="items-center justify-between border-b p-4"
        style={{ height: '7.5vh', minHeight: '7.5vh' }}
      >
        <p className="text-lg leading-tight">Employee Directory</p>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AlignJustify />}
            variant="outline"
          />

          <MenuList>
            <MenuItem
              icon={<UserPlus />}
              onClick={async () => {
                dispatch(setIsAddEmployeeModalOpen(true))
              }}
            >
              Add Employee
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        className="flex-col overflow-auto scroll-auto p-4 pt-3"
        style={{ height: '87.5vh' }}
      >
        <Flex className="flex-col">
          <Text className="font-bold">Departments</Text>

          <Flex className="ml-2 flex-col">
            {isDepartmentsLoading ? (
              <div>Loading departments...</div>
            ) : (
              departmentsData?.map((department) => (
                <Text
                  key={department.uuid}
                  onClick={() => handleDepartmentSelected(department.uuid)}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  backgroundColor={
                    isFilterSelected('departments', department.uuid)
                      ? 'gray.200'
                      : 'transparent'
                  }
                >
                  {department.name}
                </Text>
              ))
            )}
          </Flex>

          <Text className="mt-5 font-bold">Locations</Text>

          <Flex className="ml-2 flex-col">
            {isLocationsLoading ? (
              <div>Loading locations...</div>
            ) : (
              locationsData?.map((location) => (
                <Text
                  key={location.uuid}
                  onClick={() => handleLocationSelected(location.uuid)}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  backgroundColor={
                    isFilterSelected('locations', location.uuid)
                      ? 'gray.200'
                      : 'transparent'
                  }
                >
                  {location.country}
                </Text>
              ))
            )}
          </Flex>

          <Text className="mt-5 font-bold">Projects</Text>

          <Flex className="ml-2 flex-col">
            {isProjectsLoading ? (
              <div>Loading projects...</div>
            ) : (
              projectsData?.map((project) => (
                // <Text key={project.uuid}>{project.name}</Text>

                <Text
                  key={project.uuid}
                  onClick={() => handleProjectSelected(project.uuid)}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  backgroundColor={
                    isFilterSelected('projects', project.uuid)
                      ? 'gray.200'
                      : 'transparent'
                  }
                >
                  {project.name}
                </Text>
              ))
            )}
          </Flex>

          <Text className="mt-5 font-bold">Skills</Text>

          <Flex className="ml-2 flex-col">
            {isSkillsLoading ? (
              <div>Loading skills...</div>
            ) : (
              skillsData?.map((skill) => (
                <Text
                  key={skill.uuid}
                  onClick={() => handleSkillSelected(skill.uuid)}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  backgroundColor={
                    isFilterSelected('skills', skill.uuid)
                      ? 'gray.200'
                      : 'transparent'
                  }
                >
                  {skill.name}
                </Text>
              ))
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        className="box-content flex items-center justify-between border-t px-4 py-0"
        style={{ height: '7.5vh' }}
      >
        <Flex className="items-center ">
          <Avatar size="md" />
          <p className="ml-2  text-lg">Admin</p>
        </Flex>
      </Flex>
    </div>
  )
}

export default Sidebar
