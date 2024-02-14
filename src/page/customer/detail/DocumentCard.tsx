import { ViewIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { Delivery, DocumentType, exportDocument, Invoice } from '../../../backend';
import { dateFormatter } from '../../../utils/formatter';

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderRadius="8px"
      border="1px solid #aaaaaa"
    >
      <Flex>
        <Box
          fontWeight="bold"
          width="150px"
          className="date"
        >
          {dateFormatter(invoice.createdAt)}
        </Box>
        <Box>{invoice.documentId}</Box>
      </Flex>
      <Flex>
        <IconButton
          aria-label="export"
          variant="outline"
          icon={<ViewIcon />}
          onClick={() => exportDocument({ payload: invoice, type: DocumentType.invoice, open: true })}
        />
      </Flex>
    </Flex>
  );
}

export function DeliveryCard({ delivery }: { delivery: Delivery }) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderRadius="8px"
      border="1px solid #aaaaaa"
    >
      <Flex>
        <Box
          fontWeight="bold"
          width="150px"
          className="date"
        >
          {dateFormatter(delivery.deliveredAt)}
        </Box>
        <Box>{delivery.documentId}</Box>
      </Flex>

      <Flex>
        <IconButton
          aria-label="export"
          variant="outline"
          icon={<ViewIcon />}
          onClick={() => exportDocument({ payload: delivery, type: DocumentType.delivery, open: true })}
        />
      </Flex>
    </Flex>
  );
}
