import { Center } from '@chakra-ui/react';
import { useProducts } from '../../hooks/useProducts';

export function ProductAll() {
  const { products } = useProducts();

  const length = products.length;
  return <Center>{`${length} produit${length > 1 ? 's' : ''}`}</Center>;
}
