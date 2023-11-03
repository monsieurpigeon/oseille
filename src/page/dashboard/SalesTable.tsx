import { Button } from '@chakra-ui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Customer, Delivery, Invoice, Product, relDb } from '../../backend';
import { round } from '../../utils/compute';
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

interface Sales {
  product: string;
  productId: string;
  customer: string;
  customerId: string;
  totalPrice: number;
}

export function SalesTable() {
  const [sales, setSales] = useState<Sales[]>([]);

  const { products, customers, invoices } = useLoaderData() as {
    products: Product[];
    customers: Customer[];
    invoices: Invoice[];
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getSales = async () => {
      const sales = await Promise.all(
        invoices.map(async (invoice) => {
          const deliveries = (await relDb.rel.find('Idelivery', invoice.deliveries)).Ideliveries as Delivery[];
          const customer = (await relDb.rel.find('Icustomer', invoice.customer)).Icustomers[0] as Customer;
          const products = deliveries.flatMap((delivery) => {
            return delivery?.lines.map((line) => {
              const product = line.product;
              return {
                product: product?.name || 'defaultProduct',
                productId: product?.id || '000',
                customer: customer?.name,
                customerId: customer?.id,
                totalPrice: line.quantity * line.price || 0,
              };
            });
          });
          return products;
        }),
      );
      return sales.flat() as Array<Sales>;
    };
    getSales().then(setSales);
  }, [invoices]);

  const salesByProduct = sales.reduce((memo, sale) => {
    if (!sale) return memo;
    return {
      ...memo,
      [sale.productId]: {
        ...memo[sale.productId],
        [sale.customerId as string]: (memo[sale.productId]?.[sale.customerId as string] || 0) + sale.totalPrice,
      },
    };
  }, {} as { [key: string]: { [key: string]: number } });

  const valuesList = Object.values(salesByProduct)
    .flatMap((product) => Object.values(product))
    .sort((a, b) => b - a);

  const threshold = valuesList[Math.floor(valuesList.length / 4)];

  const productsPlus = products
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

  const customersPlus = customers
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
                🌞 {priceFormatter(sales.reduce((memo, sale) => memo + (round(sale?.totalPrice) || 0), 0))}
              </div>{' '}
            </td>
            {customersPlus.map((customer) => (
              <td className="vertical">
                <div>{customer.name}</div>
                <div className="main-price">{priceFormatter(customer.total)}</div>
              </td>
            ))}
          </thead>
          <tbody>
            {productsPlus.map((product: any) => (
              <tr>
                <td className="horizontal">
                  <div>{product.name}</div>
                  <div className="main-price">{priceFormatter(product.total)}</div>
                </td>
                {customersPlus.map((customer) => (
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
