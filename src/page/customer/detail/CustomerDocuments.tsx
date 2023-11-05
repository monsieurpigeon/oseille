import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomWithHash } from 'jotai-location';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Delivery, Invoice } from '../../../backend';
import { SalesGraph } from '../../../component/modules/graph/SalesGraph';
import { DeliveryCard, InvoiceCard } from './DocumentCard';

const tabAtom = atomWithHash('tab', 0);

export function CustomerDocuments() {
  const { invoices, deliveries } = useLoaderData() as { invoices: Invoice[]; deliveries: Delivery[] };

  const [tab, setTab] = useAtom(tabAtom);

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
              {deliveries.map((delivery) => {
                return (
                  <DeliveryCard
                    key={delivery.id}
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
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                />
              ))}
            </DocumentWrapper>
          </StyledTab>
        )}
        {tab === 2 && (
          <StyledTab>
            <SalesGraph invoices={invoices} />
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
