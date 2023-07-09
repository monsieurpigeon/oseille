import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import styled from 'styled-components';
import { Delivery, DocumentType, Invoice, exportDocument } from '../../backend';
import { dateFormatter } from '../../utils/formatter';

export const DocumentCard = styled.div`
  border: 1px solid #aaaaaa;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    display: flex;
    .date {
      font-weight: bold;
      width: 150px;
    }
  }

  .actions {
    display: flex;
  }
`;

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <DocumentCard>
      <div className="info">
        <div className="date">{dateFormatter(invoice.createdAt)}</div>
        <div className="id">{invoice.documentId}</div>
      </div>
      <div className="actions">
        <IconButton
          aria-label="export"
          variant="outline"
          icon={<ViewIcon />}
          onClick={() => exportDocument({ payload: invoice, type: DocumentType.invoice, open: true })}
        />
      </div>
    </DocumentCard>
  );
}

export function DeliveryCard({ delivery }: { delivery: Delivery }) {
  return (
    <DocumentCard>
      <div className="info">
        <div className="date">{dateFormatter(delivery.deliveredAt)}</div>
        <div className="id">{delivery.documentId}</div>
      </div>

      <div className="actions">
        <IconButton
          aria-label="export"
          variant="outline"
          icon={<ViewIcon />}
          onClick={() => exportDocument({ payload: delivery, type: DocumentType.delivery, open: true })}
        />
      </div>
    </DocumentCard>
  );
}
