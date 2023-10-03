import { Button } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { Invoice, exportDocument } from '../../../backend';

interface ExportInvoiceActionProps {
  invoice: Invoice;
}

export function InvoiceExportPdfButton({ invoice }: ExportInvoiceActionProps) {
  const posthog = usePostHog();
  return (
    <Button
      colorScheme="twitter"
      onClick={() => {
        exportDocument({ payload: invoice, type: 'Invoice' });
        posthog?.capture('invoice_export');
      }}
      ml={3}
    >
      Exporter
    </Button>
  );
}
