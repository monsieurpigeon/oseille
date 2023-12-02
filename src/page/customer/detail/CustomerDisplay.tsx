import { Box, SimpleGrid } from '@chakra-ui/react';
import { Customer } from '../../../backend';
import { MyIcon } from '../../../component/MyIcon';

export function CustomerDisplay({ customer }: { customer: Customer }) {
  return (
    <SimpleGrid
      columns={2}
      spacing={10}
    >
      <Box flexGrow={1}>
        <Box>{customer.name}</Box>
        <Box>{customer.address1}</Box>
        <Box>{customer.address2}</Box>
        <Box>
          {customer.zip} {customer.city}
        </Box>
      </Box>
      <Box flexGrow={1}>
        {customer.tvaRef && <Box>N° TVA: {customer.tvaRef}</Box>}
        {customer.phone && (
          <Box>
            <MyIcon name="phone" /> {customer.phone}
          </Box>
        )}
        {customer.notes && (
          <Box>
            <MyIcon name="order" /> {customer.notes}
          </Box>
        )}
      </Box>
    </SimpleGrid>
  );
}
