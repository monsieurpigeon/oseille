import { Center } from '@chakra-ui/react';
import { useData } from '../../utils/DataContext';

export function CustomerAll() {
  const { customers } = useData();

  const length = customers.length;
  return <Center>{`${length} client${length > 1 ? 's' : ''}`}</Center>;
}
