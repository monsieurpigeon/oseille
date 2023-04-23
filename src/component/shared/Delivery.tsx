import { Flex } from '@chakra-ui/react';
import { Delivery } from '../../backend';
import { dateFormatter } from '../../utils/formatter';

export function DeliveryDescriptionLine({ delivery }: { delivery: Delivery }) {
  return (
    <Flex gap={5}>
      <div>{delivery.customer.name}</div>
      <div>{dateFormatter(delivery.deliveredAt)}</div>
      <div>{delivery.documentId}</div>
    </Flex>
  );
}
