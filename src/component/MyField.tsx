import { Box, Text } from '@chakra-ui/react';

interface MyFieldProps {
  title: string;
  children: React.ReactNode;
}

export function MyField({ title, children }: MyFieldProps) {
  return (
    <Box p={1}>
      <Text>{title}</Text>
      {children}
    </Box>
  );
}
