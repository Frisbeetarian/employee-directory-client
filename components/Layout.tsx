import React from 'react';
import NavigationBar from './NavigationBar';
import { Flex } from '@chakra-ui/react';

const Layout: React.FC = ({ children }) => {
  return (
    <Flex className="flex-col">
      <NavigationBar/>
      {children}
    </Flex>
  );
};

export default Layout;
