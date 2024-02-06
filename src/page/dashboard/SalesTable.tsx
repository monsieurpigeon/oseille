import { Box, Button, FormLabel, Switch, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Customer, Delivery, Invoice, Product, relDb } from '../../backend';
import { round } from '../../utils/compute';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';

interface Sales {
  product: string;
  productId: string;
  customer: string;
  customerId: string;
  totalPrice: number;
  totalQuantity: number;
}

export function SalesTable() {
  const [sales, setSales] = useState<Sales[]>([]);
  const { country } = useRouteLoaderData('farm') as { country: Country };

  const [selectedTable, setSelectedTable] = useState(false);

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
                totalQuantity: line.quantity || 0,
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
        [sale.customerId as string]: {
          ...memo[sale.productId]?.[sale.customerId as string],
          price: (memo[sale.productId]?.[sale.customerId as string]?.price || 0) + sale.totalPrice,
          unit: (memo[sale.productId]?.[sale.customerId as string]?.unit || 0) + sale.totalQuantity,
        },
      },
    };
  }, {} as { [key: string]: { [key: string]: { price: number; unit: number } } });

  const valuesList = Object.values(salesByProduct)
    .flatMap((product) => Object.values(product))
    .sort((a, b) => b.price - a.price);

  const threshold = valuesList[Math.floor(valuesList.length / 4)];

  const productsPlus = products
    .map((product) => {
      const customerSales = salesByProduct[product.id];
      return {
        name: product.name,
        id: product.id,
        total: Object.values(customerSales || {}).reduce((memo, value) => memo + value.price, 0),
        totalUnit: Object.values(customerSales || {}).reduce((memo, value) => memo + value.unit, 0),
        unit: product.unit,
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
        <>
          <Box
            display="flex"
            alignItems="center"
            gap={4}
          >
            <FormLabel mb="0">Prix HT</FormLabel>
            <Switch
              // TODO dégueulasse
              value={selectedTable as unknown as string}
              onChange={(e) => setSelectedTable(e.target.checked)}
            />
            <FormLabel mb="0">Unité (kg, botte, ...)</FormLabel>
          </Box>
          {!selectedTable && (
            <PriceTable
              sales={sales}
              country={country}
              customersPlus={customersPlus}
              productsPlus={productsPlus}
              threshold={threshold}
            />
          )}
          {selectedTable && (
            <UnitTable
              customersPlus={customersPlus}
              productsPlus={productsPlus}
              sales={sales}
              threshold={threshold}
            />
          )}
        </>
      )}
    </>
  );
}

export const PriceTable = ({ sales, country, customersPlus, productsPlus, threshold }: any) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th
          textAlign="center"
          fontSize="1.5em"
          lineHeight="1em"
        >
          <Box>Total:</Box>
          <Box fontWeight="bold">
            🌞
            {priceFormatter(
              sales.reduce((memo: number, sale: Sales) => memo + (round(sale?.totalPrice) || 0), 0),
              country.currency,
            )}
          </Box>
        </Th>
        {customersPlus.map((customer: Customer & { total: number }) => (
          <Th
            className="vertical"
            key={customer.id}
          >
            <Box>{customer.name}</Box>
            <Box className="main-price">{priceFormatter(customer.total, country.currency)}</Box>
          </Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {productsPlus.map((product: any) => (
        <Tr key={product.id}>
          <Td padding="5px">
            <div>{product.name}</div>
            <Box fontWeight="bold">{priceFormatter(product.total, country.currency)}</Box>
          </Td>
          {customersPlus.map((customer: Customer) => (
            <Td
              key={`${product.id}\n${customer.id}`}
              fontWeight={product[customer.id]?.price > threshold.price ? 'bold' : 'normal'}
              title={`${product.name}\n${customer.name}`}
            >
              {!!product[customer.id]?.price && priceFormatter(product[customer.id]?.price, country.currency)}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const UnitTable = ({ customersPlus, productsPlus, threshold }: any) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th
          textAlign="center"
          fontSize="1.5em"
        >
          <Box fontWeight="bold">🌚</Box>
        </Th>
        {customersPlus.map((customer: Customer) => (
          <Th
            className="vertical"
            key={customer.id}
          >
            <Box>{customer.name}</Box>
          </Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {productsPlus.map((product: any) => (
        <Tr key={product.id}>
          <Td padding="5px">
            <Box>{product.name}</Box>
            <Box fontWeight="bold">
              {Math.floor(product.totalUnit)} {product.unit}
            </Box>
          </Td>
          {customersPlus.map((customer: Customer) => (
            <Td
              key={`${product.id}\n${customer.id}`}
              fontWeight={product[customer.id]?.price > threshold.price ? 'bold' : 'normal'}
              title={`${product.name}\n${customer.name}`}
            >
              {!!product[customer.id] && `${Math.floor(product[customer.id].unit)} ${product.unit}`}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </Table>
);
