import { Button } from '@chakra-ui/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { priceFormatter } from '../../utils/formatter';

const StyledTable = styled.table`
  .total {
    text-align: center;
    font-size: 1.5em;
    .price {
      font-weight: bold;
    }
  }
  .vertical {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    padding-left: 10px;
    height: 200px;
    padding-top: 20px;
  }

  .horizontal {
    padding: 5px;
  }

  .main-price {
    font-weight: bold;
  }
  td {
    border: 1px solid grey;
  }

  .cell {
    &.top {
      font-weight: bold;
    }
    text-align: center;
    user-select: none;
  }
`;

export function SalesTable() {
  const snap = useSnapshot(store);

  const [show, setShow] = useState(false);

  const sales = useMemo(() => {
    return store.invoices.flatMap((invoice) => {
      const deliveries = invoice.deliveryIds.map((id) => store.deliveries.find((d) => d.id === id));
      const products = deliveries.flatMap((delivery) => {
        return delivery?.lines.map((line) => {
          const product = store.products.find((p) => p.id === line.product.id);
          return {
            product: product?.name || 'defaultProduct',
            productId: product?.id || '000',
            customer: invoice.customer.name,
            customerId: invoice.customer.id,
            totalPrice: line.quantity * line.price || 0,
          };
        });
      });
      return products;
    });
  }, [snap]);

  const salesByProduct = sales.reduce((memo, sale) => {
    if (!sale) return memo;
    return {
      ...memo,
      [sale.productId]: {
        ...memo[sale.productId],
        [sale.customerId]: (memo[sale.productId]?.[sale.customerId] || 0) + sale.totalPrice,
      },
    };
  }, {} as { [key: string]: { [key: string]: number } });

  const valuesList = Object.values(salesByProduct)
    .flatMap((product) => Object.values(product))
    .sort((a, b) => b - a);

  const threshold = valuesList[Math.floor(valuesList.length / 4)];

  const products = snap.products
    .map((product) => {
      const customerSales = salesByProduct[product.id];
      return {
        name: product.name,
        id: product.id,
        total: Object.values(customerSales || {}).reduce((memo, value) => memo + value, 0),
        ...customerSales,
      };
    })
    .sort((a, b) => b.total - a.total);

  const customers = snap.customers
    .map((customer) => ({
      name: customer.name,
      id: customer.id,
      total: sales
        .filter((sale) => sale?.customerId === customer.id)
        .reduce((memo, sale) => memo + (sale?.totalPrice || 0), 0),
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <>
      <Button onClick={() => setShow((v) => !v)}>{show ? 'Cacher les ventes 🫣' : 'Montrer les ventes 😎'}</Button>
      {show && (
        <StyledTable>
          <thead>
            <td className="total">
              <div>Total:</div>
              <div className="price">
                🌞 {priceFormatter(sales.reduce((memo, sale) => memo + (sale?.totalPrice || 0), 0))}
              </div>{' '}
            </td>
            {customers.map((customer) => (
              <td className="vertical">
                <div>{customer.name}</div>
                <div className="main-price">{priceFormatter(customer.total)}</div>
              </td>
            ))}
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr>
                <td className="horizontal">
                  <div>{product.name}</div>
                  <div className="main-price">{priceFormatter(product.total)}</div>
                </td>
                {customers.map((customer) => (
                  <td
                    className={clsx('cell', { top: product[customer.id] > threshold })}
                    title={`${product.name}\n${customer.name}`}
                  >
                    {!!product[customer.id] && priceFormatter(product[customer.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </>
  );
}
