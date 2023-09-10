import { Button, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MyH2 } from '../../../component/typography/MyFont';

interface SettingCardProps {
  children: ReactNode;
  title: string;
  onUpdate?: () => void;
}

export function SettingCard({ children, title, onUpdate }: SettingCardProps) {
  return (
    <Flex
      direction="column"
      gap={4}
      alignItems="center"
      grow={1}
      padding={4}
      border="1px solid grey"
      borderRadius={5}
      maxWidth={400}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        gap="8"
        width="100%"
      >
        <MyH2>{title}</MyH2>
        <Button
          onClick={onUpdate}
          colorScheme="twitter"
        >
          Modifier
        </Button>
      </Flex>
      {children}
    </Flex>
  );
}
