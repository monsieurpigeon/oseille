import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="10px 20px"
    >
      <Text>Hello</Text>
      <Button
        onClick={() => setIsOpen(false)}
        size="xs"
      >
        Close
      </Button>
    </Flex>
  ) : null;
}
