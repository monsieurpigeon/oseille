import { Center } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Customer } from '../../backend';

export function CustomerAll() {
  const customers = useRouteLoaderData('customers') as Customer[];
  const length = customers?.length;
  return <Center>{`${length} client${length > 1 ? 's' : ''}`}</Center>;
}
