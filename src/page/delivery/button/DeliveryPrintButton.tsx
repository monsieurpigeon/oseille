import { Button } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { Delivery, exportDocument } from '../../../backend';

interface DeliveryPrintButtonProps {
  delivery: Delivery;
}

export function DeliveryPrintButton({ delivery }: DeliveryPrintButtonProps) {
  const posthog = usePostHog();
  return (
    <Button
      colorScheme="twitter"
      onClick={() => {
        posthog?.capture('delivery_export');
        exportDocument({ payload: delivery, type: 'Delivery' });
      }}
      ml={3}
    >
      Imprimer
    </Button>
  );
}
