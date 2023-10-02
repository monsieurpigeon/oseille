import { Center } from '@chakra-ui/react';
import { store } from '../../backend';

export function CustomerAll() {
  const length = store.customers.length;
  return <Center>{`${length} client${length > 1 ? 's' : ''}`}</Center>;
}
