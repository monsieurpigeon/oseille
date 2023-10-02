import { Box } from '@chakra-ui/react';
import { Customer } from '../../../backend';

export function CustomerDisplay({ customer }: { customer: Customer }) {
  return (
    <Box>
      <Box>{customer.name}</Box>
      <Box>{customer.address1}</Box>
      <Box>{customer.address2}</Box>
      <Box>
        {customer.zip} {customer.city}
      </Box>
      <Box>{customer.phone}</Box>
      <Box>{customer.notes}</Box>
    </Box>
  );
}
