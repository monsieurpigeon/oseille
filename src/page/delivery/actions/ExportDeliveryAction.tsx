import { Button } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { Delivery, exportDocument } from '../../../backend';

interface ExportDeliveryActionProps {
  delivery: Delivery;
}

export function ExportDeliveryAction({ delivery }: ExportDeliveryActionProps) {
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
      Exporter
    </Button>
  );
}
