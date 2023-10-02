import { Text } from '@chakra-ui/react';
import { MyIcon } from './MyIcon';

interface MyMessageProps {
  text: string;
}

export function MyMessage({ text }: MyMessageProps) {
  return (
    <Text
      border="1px solid grey"
      padding="2"
      borderRadius="6"
    >
      <MyIcon name="warning" /> {text}
    </Text>
  );
}
