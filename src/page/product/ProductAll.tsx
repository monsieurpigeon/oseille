import { Center } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Product } from '../../backend';

export function ProductAll() {
  const products = useRouteLoaderData('products') as Product[];
  const length = products?.length;

  return <Center>{`${length} produit${length > 1 ? 's' : ''}`}</Center>;
}
