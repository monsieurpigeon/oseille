import { Box, Flex } from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { Customer, Invoice, isInvoicePaid } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceExportCsvButton } from './button/InvoiceExportCsvButton';

export function InvoicePage() {
  const navigate = useNavigate();
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('invoice_page_viewed');
  }, []);

  const { customers, invoices, timestamp } = useLoaderData() as {
    customers: Customer[];
    invoices: Invoice[];
    timestamp: number;
  };

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <Flex
            alignItems="center"
            gap={2}
          >
            <MyH1>Factures</MyH1>
            <InfoModal>
              <Flex
                direction="column"
                gap={2}
              >
                <Box>
                  Une facture est définie par un client, une date de facturation, une liste de livraisons, un paiement
                  et une note.
                </Box>
                <Box>Les factures sont classées par client.</Box>
                <Box>Cliquez sur une facture pour ouvrir le détail.</Box>
                <Box>Cliquez sur IMPRIMER pour enregistrer la facture en pdf.</Box>
                <Box>Quand aucune facture n'est sélectionnée, vous retrouverez une liste des factures en retard.</Box>
                <Box>Pour noter une facture comme payée : cliquez sur MODIFIER et cochez la case PAYÉE.</Box>
                <Box>Les factures en retard ont un panneau danger dans la liste.</Box>
                <Box>Les factures payées sont plus claires dans la liste.</Box>
              </Flex>
            </InfoModal>
          </Flex>
          <InvoiceExportCsvButton />
        </MyHeader>
        <MyScrollList>
          {invoices.length === 0 && (
            <MyScrollList.Empty onClick={() => navigate('../delivery')}>
              Facturer mon premier bon de livraison
            </MyScrollList.Empty>
          )}
          {customers.map((customer) => (
            <InvoiceCustomer
              key={customer.id}
              customer={customer}
              invoices={invoices.filter((invoice) => invoice.customer === customer.id)}
            />
          ))}
        </MyScrollList>
      </MySide>
      <MySide>
        <Outlet />
      </MySide>
    </MyPage>
  );
}

function InvoiceCustomer({ customer, invoices }: { customer: Customer; invoices: Invoice[] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoiceDelay } = useRouteLoaderData('farm') as any;

  if (invoices.length === 0) return null;
  return (
    <ListItemGroup title={customer.name}>
      {invoices.map((invoice) => {
        const isLate = isInvoicePaid(invoice)
          ? false
          : differenceInDays(new Date(), new Date(invoice.createdAt)) > invoiceDelay;
        return (
          <ListItem
            key={invoice.id}
            done={isInvoicePaid(invoice)}
            alert={isLate}
            isSelected={id === invoice.id}
            onClick={() => navigate(invoice.id === id ? '' : invoice.id)}
          >
            {isLate && '⚠️'} {`${invoice.documentId} - ${dateFormatter(invoice.createdAt)}`}
          </ListItem>
        );
      })}
    </ListItemGroup>
  );
}
