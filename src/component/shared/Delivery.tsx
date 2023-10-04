import { Box, Flex } from '@chakra-ui/react';
import { Delivery } from '../../backend';
import { dateFormatter } from '../../utils/formatter';
import { MyIcon } from '../MyIcon';

export function DeliveryDescriptionLine({ delivery }: { delivery: Delivery }) {
  return (
    <Flex
      direction="column"
      gap={1}
    >
      <Flex gap={5}>
        <div>{delivery.customer.name}</div>
        <div>{dateFormatter(delivery.deliveredAt)}</div>
        <div>{delivery.documentId}</div>
      </Flex>
      <Box>
        {delivery.isOrder && (
          <>
            <MyIcon name="order" /> Commande à récolter
          </>
        )}
      </Box>
    </Flex>
  );
}
