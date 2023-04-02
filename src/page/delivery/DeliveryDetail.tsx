import { Button, Flex, Spacer } from '@chakra-ui/react';
import { Delivery, Product, exportDocument, store } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter, priceFormatter } from '../../utils/formatter';

export const DeliveryDetail = ({ selected }: { selected: Delivery }) => {
  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          onClick={() => exportDocument({ payload: selected, type: 'Delivery' })}
          ml={3}
        >
          Exporter
        </Button>
      </div>

      <div>
        <Flex>
          <div>
            {selected.documentId}
            {selected.invoiceId
              ? ` - Facture ${store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}`
              : ''}
          </div>
          <Spacer />
          <div>{dateFormatter(selected.deliveredAt)}</div>
        </Flex>
        <Flex>
          <div>{selected.customer.name}</div>
          <Spacer />
          <div>
            {priceFormatter(
              selected.lines.reduce(
                (acc: number, el: { product: Product; quantity: number }) => acc + el.product.price * el.quantity,
                0,
              ),
            )}
          </div>
        </Flex>

        <table style={{ width: '100%', textAlign: 'right', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {selected.lines.map((line, index) => (
              <tr key={`${index}`}>
                <td>{line.product.name}</td>
                <td>
                  {line.quantity} {line.product.unit}
                </td>
                <td>{priceFormatter(line.product.price)}</td>
                <td>{priceFormatter(line.product.price * line.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
