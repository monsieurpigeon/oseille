import { Button } from '@chakra-ui/react';
import { Invoice, exportDocument } from '../../../backend';

interface ExportInvoiceActionProps {
  invoice: Invoice;
}

export function ExportInvoiceAction({ invoice }: ExportInvoiceActionProps) {
  return (
    <Button
      colorScheme="twitter"
      onClick={() => exportDocument({ payload: invoice, type: 'Invoice' })}
      ml={3}
    >
      Exporter
    </Button>
  );
}
