import React from 'react'
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
} from '@chakra-ui/react'
import { SettingsIcon, HamburgerIcon, EditIcon } from '@chakra-ui/icons'

function Sidebar() {
  const router = useRouter()

  return (
    <div
      className="bg-neutral relative box-content flex flex-col scroll-auto border-r text-black"
      style={{ width: '20vw', height: '100vh' }}
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
        className="flex-col overflow-auto scroll-auto pt-3"
        style={{ height: '87.5vh' }}
      ></Flex>

      <Flex
        className="box-content flex items-center justify-between border-t border-red-500 px-4 py-4 md:px-0 md:py-0"
        style={{ height: '7.5vh' }}
      >
        <Flex className="items-center px-2">
          <Avatar size="md" bg="red.500" />
          <p className="ml-2 text-lg text-white"></p>
        </Flex>

        <Flex className="justify-between px-3">
          <Menu>
            <MenuButton>
              <SettingsIcon />
            </MenuButton>

            <MenuList bg="black" className="" border="none" borderRadius="0">
              <MenuItem
                bg="bg-black"
                className="bg-black"
                border="none"
                onClick={async () => {
                  try {
                    router.replace('/')
                  } catch (error) {
                    console.error('Error logging out:', error)
                  }
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </div>
  )
}

export default Sidebar
