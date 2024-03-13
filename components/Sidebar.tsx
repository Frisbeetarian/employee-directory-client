import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
import { SettingsIcon, HamburgerIcon, EditIcon } from '@chakra-ui/icons'
import {
  useGetDepartmentsQuery,
  useGetEmployeesByDepartmentUuidQuery,
} from '@/store/api/departmentsAPISlice'
import { useDispatch } from 'react-redux'
import { setDepartments, setSelectedDepartment } from '@/store/departments'
import {
  useGetEmployeesByLocationUuidQuery,
  useGetLocationsQuery,
} from '@/store/api/locationsAPISlice'
import { setLocations, setSelectedLocation } from '@/store/locations'
import { setProjects, setSelectedProject } from '@/store/projects'
import {
  useGetEmployeesByProjectUuidQuery,
  useGetProjectsQuery,
} from '@/store/api/projectsAPISlice'
import {
  useGetEmployeesBySkillUuidQuery,
  useGetSkillsQuery,
} from '@/store/api/skillsAPISlice'
import { setSelectedSkill, setSkills } from '@/store/skills'
import { setEmployees } from '@/store/employees'
import {
  setActiveIndex,
  setPaginationData,
  setShouldFetchEmployees,
} from '@/store/ui'

function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedDepartmentUuid, setSelectedDepartmentUuid] = useState(null)
  const [selectedLocationUuid, setSelectedLocationUuid] = useState(null)
  const [selectedProjectUuid, setSelectedProjectUuid] = useState(null)
  const [selectedSkillUuid, setSelectedSkillUuid] = useState(null)

  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery()

  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery()

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery()

  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery()

  const {
    data: employeesByDepartment,
    isLoading: isEmployeesByDepartmentLoading,
  } = useGetEmployeesByDepartmentUuidQuery(
    { departmentUuid: selectedDepartmentUuid, page: 1, limit: 12 },
    {
      skip: !selectedDepartmentUuid,
    }
  )

  const { data: employeesByLocation, isLoading: isEmployeesByLocationLoading } =
    useGetEmployeesByLocationUuidQuery(
      { locationUuid: selectedLocationUuid, page: 1, limit: 12 },
      {
        skip: !selectedLocationUuid,
      }
    )

  const { data: employeesByProject, isLoading: isEmployeesByProjectLoading } =
    useGetEmployeesByProjectUuidQuery(
      { projectUuid: selectedProjectUuid, page: 1, limit: 12 },
      {
        skip: !selectedProjectUuid,
      }
    )

  const { data: employeesBySkill, isLoading: isEmployeesBySkillLoading } =
    useGetEmployeesBySkillUuidQuery(
      { skillUuid: selectedSkillUuid, page: 1, limit: 12 },
      {
        skip: !selectedSkillUuid,
      }
    )

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

  useEffect(() => {
    if (
      employeesByDepartment &&
      !isEmployeesByDepartmentLoading &&
      employeesByDepartment.length !== 0
    ) {
      dispatch(setEmployees(employeesByDepartment.employees))

      dispatch(
        setPaginationData({
          page: employeesByDepartment.currentPage,
          limit: 12,
          pageCount: employeesByDepartment.totalPages,
          totalCount: employeesByDepartment.totalCount,
        })
      )
    }
  }, [employeesByDepartment])

  useEffect(() => {
    if (
      employeesByLocation &&
      !isEmployeesByLocationLoading &&
      employeesByLocation.length !== 0
    ) {
      dispatch(setEmployees(employeesByLocation.employees))

      dispatch(
        setPaginationData({
          page: employeesByLocation.currentPage,
          limit: 12,
          pageCount: employeesByLocation.totalPages,
          totalCount: employeesByLocation.totalCount,
        })
      )
    }
  }, [employeesByLocation])

  useEffect(() => {
    if (
      employeesByProject &&
      !isEmployeesByProjectLoading &&
      employeesByProject.length !== 0
    ) {
      dispatch(setEmployees(employeesByProject.employees))

      dispatch(
        setPaginationData({
          page: employeesByProject.currentPage,
          limit: 12,
          pageCount: employeesByProject.totalPages,
          totalCount: employeesByProject.totalCount,
        })
      )
    }
  }, [employeesByProject])

  useEffect(() => {
    if (
      employeesBySkill &&
      !isEmployeesBySkillLoading &&
      employeesBySkill.length !== 0
    ) {
      dispatch(setEmployees(employeesBySkill.employees))

      dispatch(
        setPaginationData({
          page: employeesBySkill.currentPage,
          limit: 12,
          pageCount: employeesBySkill.totalPages,
          totalCount: employeesBySkill.totalCount,
        })
      )
    }
  }, [employeesBySkill])

  function handleDepartmentSelected(departmentUuid) {
    dispatch(setActiveIndex('departments'))
    dispatch(setSelectedDepartment(departmentUuid))
    dispatch(setShouldFetchEmployees(false))

    setSelectedDepartmentUuid(departmentUuid)
  }

  function handleLocationSelected(locationUuid) {
    dispatch(setActiveIndex('locations'))
    dispatch(setSelectedLocation(locationUuid))
    dispatch(setShouldFetchEmployees(false))

    setSelectedLocationUuid(locationUuid)
  }

  function handleProjectSelected(projectUuid) {
    dispatch(setActiveIndex('projects'))
    dispatch(setSelectedProject(projectUuid))
    dispatch(setShouldFetchEmployees(false))

    setSelectedProjectUuid(projectUuid)
  }

  function handleSkillSelected(skillUuid) {
    dispatch(setActiveIndex('skills'))
    dispatch(setSelectedSkill(skillUuid))
    dispatch(setShouldFetchEmployees(false))

    setSelectedSkillUuid(skillUuid)
  }

  return (
    <div
      className="bg-neutral relative box-content flex flex-col scroll-auto border-r text-black"
      style={{ width: '15vw', minWidth: '15vw', height: '100vh' }}
    >
      <Flex
        className=" border-b p-4"
        style={{ height: '7.5vh', minHeight: '7.5vh' }}
      >
        <p className="text-lg leading-tight">Employee Directory</p>

        {/*<Menu>*/}
        {/*  <MenuButton*/}
        {/*    as={IconButton}*/}
        {/*    aria-label="Options"*/}
        {/*    icon={<HamburgerIcon />}*/}
        {/*    variant="outline"*/}
        {/*    color="black"*/}
        {/*    className="mr-3 "*/}
        {/*    border="none"*/}
        {/*    borderRadius="0"*/}
        {/*    style={{*/}
        {/*      zIndex: 10,*/}
        {/*    }}*/}
        {/*  />*/}

        {/*  <MenuList*/}
        {/*    bg="black"*/}
        {/*    className="z-10 "*/}
        {/*    border="none"*/}
        {/*    borderRadius="0"*/}
        {/*    style={{*/}
        {/*      zIndex: 10,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <MenuItem*/}
        {/*      bg="black"*/}
        {/*      className="z-10 "*/}
        {/*      border="none"*/}
        {/*      icon={<EditIcon />}*/}
        {/*      style={{*/}
        {/*        zIndex: 100,*/}
        {/*      }}*/}
        {/*      onClick={async () => {}}*/}
        {/*    >*/}
        {/*      Create department*/}
        {/*    </MenuItem>*/}
        {/*  </MenuList>*/}
        {/*</Menu>*/}
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
                >
                  {skill.name}
                </Text>
              ))
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        className="box-content flex items-center justify-between border-t px-4 py-10 md:px-0 md:py-0"
        style={{ height: '7.5vh' }}
      >
        <Flex className="items-center px-2">
          <Avatar size="md" />
          <p className="ml-2 text-lg ">fwefew</p>
        </Flex>

        {/*<Flex className="justify-between px-3">*/}
        {/*  <Menu>*/}
        {/*    <MenuButton>*/}
        {/*      <SettingsIcon />*/}
        {/*    </MenuButton>*/}

        {/*    <MenuList bg="black" className="" border="none" borderRadius="0">*/}
        {/*      <MenuItem*/}
        {/*        bg="bg-black"*/}
        {/*        className="bg-black"*/}
        {/*        border="none"*/}
        {/*        onClick={async () => {*/}
        {/*          try {*/}
        {/*            router.replace('/')*/}
        {/*          } catch (error) {*/}
        {/*            console.error('Error logging out:', error)*/}
        {/*          }*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        Logout*/}
        {/*      </MenuItem>*/}
        {/*    </MenuList>*/}
        {/*  </Menu>*/}
        {/*</Flex>*/}
      </Flex>
    </div>
  )
}

export default Sidebar
