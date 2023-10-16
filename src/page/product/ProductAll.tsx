import { Center } from '@chakra-ui/react';
import { useData } from '../../context/DataContext';

export function ProductAll() {
  const { products } = useData();

  const length = products.length;
  return <Center>{`${length} produit${length > 1 ? 's' : ''}`}</Center>;
}
