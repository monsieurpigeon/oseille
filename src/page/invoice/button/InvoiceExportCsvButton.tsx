import { Button, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRef } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';

const clean = (num: number) => Number(num.toFixed(5));
const translate = (num: number) => num.toLocaleString('fr-FR', { minimumFractionDigits: 2 });

export function InvoiceExportCsvButton() {
  const snap = useSnapshot(store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleExport = () => {
    const data = store.invoices
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .flatMap((invoice) => {
        const customerName = invoice.customer.name;
        const deliveries = invoice.deliveryIds.map((id) => store.deliveries.find((d) => d.id === id));
        const products = deliveries.flatMap((delivery) => {
          return delivery?.lines.map((line) => {
            const product = store.products.find((p) => p.id === line.product.id);
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
              status: invoice.isPaid ? 'Payé' : 'Attente',
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

    let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `export-factures-${format(new Date(), 'dd-MM-yyyy')}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click();
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
        cancelRef={cancelRef}
      />
    </>
  );
}
