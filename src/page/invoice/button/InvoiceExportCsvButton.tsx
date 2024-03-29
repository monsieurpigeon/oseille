import { Button, Select, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import JSZip from 'jszip';
import _ from 'lodash';
import { useMemo } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Customer, Delivery, Invoice, isInvoicePaid, Product } from '../../../backend';
import { yearAtom } from '../../../component/layout/Header';
import { MyModal } from '../../../component/modal/MyModal';
import { isteaClients, isteaPayments, isteaSales } from '../../../utils/isteaExport';

const clean = (num: number) => Number(num.toFixed(5));
const translate = (num: number) => num.toLocaleString('fr-FR', { minimumFractionDigits: 2 });

export const exportFormatAtom = atomWithStorage('exportFormat', 'csv');

export function InvoiceExportCsvButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    invoices: invoicesRaw,
    customers,
    products,
    deliveries,
  } = useRouteLoaderData('invoices') as {
    invoices: Invoice[];
    customers: Customer[];
    products: Product[];
    deliveries: Delivery[];
  };

  const [year] = useAtom(yearAtom);

  const [exportFormat, setExportFormat] = useAtom(exportFormatAtom);

  const invoices = useMemo(() => {
    if (year === '') return invoicesRaw;
    return invoicesRaw?.filter((invoice) => new Date(invoice.createdAt).getFullYear() === +year);
  }, [invoicesRaw, year]);

  const customersMap = customers.reduce((memo, cus) => {
    memo[cus.id] = cus;
    return memo;
  }, {} as Record<string, Customer>);

  const productMap = products.reduce((memo, prod) => {
    memo[prod.id] = prod;
    return memo;
  }, {} as Record<string, Product>);

  const deliveryMap = deliveries.reduce((memo, del) => {
    memo[del.id] = del;
    return memo;
  }, {} as Record<string, Delivery>);

  const csvExport = () => {
    const clone = _.cloneDeep(invoices);
    const data = clone
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .flatMap((invoice) => {
        const customer = customersMap[invoice.customer];
        const customerName = customer?.name;
        const deliveries = invoice.deliveries.map((id) => deliveryMap[id]);
        const products = deliveries.flatMap((delivery) => {
          return delivery?.lines.map((line) => {
            const product = productMap[line.product.id];
            return {
              product: product?.name,
              unit: product?.unit,
              quantity: translate(clean(line.quantity)),
              price: translate(clean(line.price)),
              deliveryDate: format(new Date(delivery?.deliveredAt), 'dd/MM/yyyy'),
              invoiceDate: format(new Date(invoice.createdAt), 'dd/MM/yyyy'),
              customer: customerName,
              invoice: invoice.documentId,
              delivery: delivery?.documentId,
              totalPrice: translate(clean(line.quantity * line.price)),
              status: isInvoicePaid(invoice) ? 'Payé' : 'Attente',
            };
          });
        });
        return products;
      });

    const rows = [
      [
        'Livré le',
        'Facturé le',
        'BL',
        'Facture',
        'Client',
        'Produit',
        'Quantité',
        'Unité',
        'Prix Unitaire',
        'Prix Total',
        'Statut',
      ],
      ...data.map((line) => [
        line?.deliveryDate,
        line?.invoiceDate,
        line?.delivery,
        line?.invoice,
        line?.customer,
        line?.product,
        line?.quantity,
        line?.unit,
        line?.price,
        line?.totalPrice,
        line?.status,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `export-factures-${format(new Date(), 'dd-MM-yyyy')}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  const isteaExport = () => {
    const zip = new JSZip();

    zip.file(`Ventes.csv`, isteaSales(invoices, customers));
    zip.file(`Reglements.csv`, isteaPayments(invoices, customers));
    zip.file(`Clients.csv`, isteaClients(customers));

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'example.zip');
    });
  };

  const handleExport = () => {
    switch (exportFormat) {
      case 'csv':
        csvExport();
        break;
      case 'istea':
        isteaExport();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Exporter tout</Button>
      <MyModal
        title="Export CSV de toutes les factures"
        confirmLabel="Exporter"
        onSubmit={handleExport}
        isOpen={isOpen}
        onClose={onClose}
      >
        <p>Format</p>
        <Select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
        >
          <option value="csv">CSV</option>
          {/* <option value="istea">ISTEA</option> */}
        </Select>
      </MyModal>
    </>
  );
}
