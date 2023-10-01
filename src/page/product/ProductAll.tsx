import { Center } from '@chakra-ui/react';
import { store } from '../../backend';

export function ProductAll() {
  const length = store.products.length;
  return <Center>{`${length} produit${length > 1 ? 's' : ''}`}</Center>;
}
