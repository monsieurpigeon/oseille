import { Button } from '@chakra-ui/react';

export function MyButton({ label, onClick }: { label: String; onClick: () => void }) {
  return (
    <Button
      colorScheme="blue"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
