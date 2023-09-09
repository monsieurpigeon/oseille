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
      gap={8}
      alignItems="center"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap="8"
        width="100%"
      >
        <MyH2>{title}</MyH2>
        <Button
          colorScheme="yellow"
          onClick={onUpdate}
        >
          Modifier
        </Button>
      </Flex>
      {children}
    </Flex>
  );
}
