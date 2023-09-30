import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import { Customer, store } from '../../backend';
import { SalesGraph } from '../../component/modules/graph/SalesGraph';
import { DeliveryCard, InvoiceCard } from './DocumentCard';

interface CustomerDocumentsProps {
  customer: Customer;
}

export function CustomerDocuments({ customer }: CustomerDocumentsProps) {
  const invoices = store.invoices
    .filter((invoice) => invoice.customerId === customer.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const deliveries = store.deliveries
    .filter((delivery) => delivery.customerId === customer.id)
    .sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));

  const [tab, setTab] = useState(0);

  return (
    <StyledContainer>
      <StyledButtons>
        <Button
          variant={tab === 0 ? 'solid' : 'outlined'}
          onClick={() => setTab(0)}
        >
          Bons de Livraison
        </Button>
        <Button
          variant={tab === 1 ? 'solid' : 'outlined'}
          onClick={() => setTab(1)}
        >
          Factures
        </Button>
        <Button
          variant={tab === 2 ? 'solid' : 'outlined'}
          onClick={() => setTab(2)}
        >
          Ventes
        </Button>
      </StyledButtons>
      <StyledWrapper>
        {tab === 0 && (
          <StyledTab>
            <DocumentWrapper>
              {deliveries.length === 0 && <div>Aucun bon de livraison</div>}
              {deliveries.map((delivery, index) => {
                return (
                  <DeliveryCard
                    key={index}
                    delivery={delivery}
                  />
                );
              })}
            </DocumentWrapper>
          </StyledTab>
        )}
        {tab === 1 && (
          <StyledTab>
            <DocumentWrapper>
              {invoices.length === 0 && <div>Aucune facture</div>}
              {invoices.map((invoice) => (
                <InvoiceCard invoice={invoice} />
              ))}
            </DocumentWrapper>
          </StyledTab>
        )}
        {tab === 2 && (
          <StyledTab>
            <SalesGraph customer={customer} />
          </StyledTab>
        )}
      </StyledWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  flex-grow: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const StyledTab = styled.div`
  display: flex;
  flex-grow: 1;
  height: 0;
`;

const DocumentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  flex-direction: column;
  gap: 8px;
`;
