import { Button } from '@chakra-ui/react';
import { Delivery, exportDocument } from '../../../backend';

interface ExportDeliveryActionProps {
  delivery: Delivery;
}

export function ExportDeliveryAction({ delivery }: ExportDeliveryActionProps) {
  return (
    <Button
      colorScheme="twitter"
      onClick={() => exportDocument({ payload: delivery, type: 'Delivery' })}
      ml={3}
    >
      Exporter
    </Button>
  );
}
