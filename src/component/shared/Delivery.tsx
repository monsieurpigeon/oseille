import { Box, Flex } from '@chakra-ui/react';
import { Customer, Delivery } from '../../backend';
import { dateFormatter } from '../../utils/formatter';
import { MyIcon } from '../MyIcon';

export function DeliveryDescriptionLine({ delivery, customer }: { delivery: Delivery; customer: Customer }) {
  return (
    <Flex
      direction="column"
      gap={1}
    >
      <Flex gap={5}>
        <div>{customer.name}</div>
        <div>{dateFormatter(delivery.deliveredAt)}</div>
        <div>{delivery.documentId}</div>
      </Flex>
      <Box>
        {delivery.isOrder && (
          <>
            <MyIcon name="order" /> Commande à préparer
          </>
        )}
      </Box>
    </Flex>
  );
}
