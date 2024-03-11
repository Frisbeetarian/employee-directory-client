import React, { useEffect } from 'react'
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
import { useGetDepartmentsQuery } from '@/store/api/departmentsAPISlice'
import { useDispatch } from 'react-redux'
import { setDepartments } from '@/store/departments'
import Employee from '@/components/Employee'
import { useGetLocationsQuery } from '@/store/api/locationsAPISlice'
import { setLocations } from '@/store/locations'

function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery()

  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery()

  useEffect(() => {
    dispatch(setLocations(locationsData))
  }, [locationsData])

  useEffect(() => {
    dispatch(setDepartments(departmentsData))
  }, [departmentsData])

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
                <Text key={department.uuid}>{department.name}</Text>
              ))
            )}
          </Flex>

          <Text className="mt-5 font-bold">Locations</Text>

          <Flex className="ml-2 flex-col">
            {isDepartmentsLoading ? (
              <div>Loading locations...</div>
            ) : (
              locationsData?.map((location) => (
                <Text key={location.uuid}>{location.country}</Text>
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
