import { Button } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { Invoice, exportDocument } from '../../../backend';

interface InvoicePrintButtonProps {
  invoice: Invoice;
}

export function InvoicePrintButton({ invoice }: InvoicePrintButtonProps) {
  const posthog = usePostHog();
  return (
    <Button
      colorScheme="twitter"
      onClick={() => {
        exportDocument({ payload: invoice, type: 'Invoice' });
        posthog?.capture('invoice_export');
      }}
    >
      Imprimer
    </Button>
  );
}
