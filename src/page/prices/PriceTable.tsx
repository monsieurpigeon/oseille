import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Customer, Price, Product } from '../../backend';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';
import { PriceEmpty } from './PriceEmpty';
import { PriceNumberInput } from './PriceNumberInput';
import './style.css';

type PriceList = { [key: string]: { [key: string]: Price } };

const getPriceColor = (defaultPrice: number | undefined, directPrice: number) => {
  if (directPrice) {
    if (directPrice > 0) {
      return 'powderblue';
    } else {
      return '#E7B8B1';
    }
  }
  if (defaultPrice) {
    if (defaultPrice > 0) {
      return 'whitesmoke';
    } else {
      return 'yellow';
    }
  }
  return 'white';
};

export function PriceTable() {
  const [currentEdit, setCurrentEdit] = useState(['', '']);
  const { country } = useRouteLoaderData('farm') as { country: Country };
  const { products, customers, prices } = useLoaderData() as {
    products: Product[];
    customers: Customer[];
    prices: Price[];
  };

  const [customerLength, productLength] = [customers.length, products.length];

  const priceList: PriceList = useMemo(
    () =>
      prices.reduce((acc, price) => {
        if (!acc[price.product]) acc[price.product] = {};
        acc[price.product][price.customer] = price;
        return acc;
      }, {} as PriceList),
    [prices],
  );

  if (customerLength === 0 || productLength === 0) {
    return (
      <PriceEmpty
        emptyCustomer={customerLength === 0}
        emptyProduct={productLength === 0}
      />
    );
  }

  return (
    <TableContainer
      overflowY="scroll"
      overflowX="scroll"
      height="100%"
    >
      <Table>
        <Thead>
          <Tr style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: 200 }}>
            <Th style={{ borderBottom: 'none' }}></Th>
            <Th>Par Défaut</Th>
            {customers.map((c) => (
              <Th key={c.id}>{c.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {products.map((p) => {
            const defaultPrice: Price | undefined = priceList[p.id]?.['DEFAULT'];

            return (
              <Tr key={p.id}>
                <Th style={{ position: 'sticky', left: '0px', backgroundColor: 'white', zIndex: 199 }}>
                  {p.name} /{p.unit}
                </Th>
                <Td
                  style={{
                    backgroundColor: defaultPrice?.value ? (defaultPrice?.value > 0 ? 'gainsboro' : 'orange') : 'white',
                    borderRight: '3px solid grey',
                  }}
                >
                  {(currentEdit[0] !== 'DEFAULT' || currentEdit[1] !== p.id) && (
                    <button onClick={() => setCurrentEdit(['DEFAULT', p.id])}>
                      {defaultPrice?.value ? `${priceFormatter(defaultPrice.value, country.currency)}HT` : <AddPrice />}
                    </button>
                  )}
                  {currentEdit[0] === 'DEFAULT' && currentEdit[1] === p.id && (
                    <PriceNumberInput
                      product={p}
                      customer="DEFAULT"
                      price={defaultPrice}
                      value={defaultPrice?.value || 0}
                      onClose={() => setCurrentEdit(['', ''])}
                    />
                  )}
                </Td>
                {customers.map((c) => {
                  const directPrice = priceList[p.id]?.[c.id];
                  const price = directPrice || defaultPrice;
                  return (
                    <Td
                      key={c.id}
                      style={{
                        backgroundColor: getPriceColor(defaultPrice?.value, directPrice?.value),
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (currentEdit[0] !== c.id || currentEdit[1] !== p.id) setCurrentEdit([c.id, p.id]);
                      }}
                      className="priceTableCell"
                      aria-label="modifier le prix"
                    >
                      {currentEdit[0] === c.id && currentEdit[1] === p.id ? (
                        <PriceNumberInput
                          product={p}
                          customer={c}
                          price={directPrice}
                          value={price?.value || 0}
                          onClose={() => setCurrentEdit(['', ''])}
                        />
                      ) : !price?.value ? (
                        <AddPrice />
                      ) : (
                        <div className="priceText">{`${priceFormatter(price?.value || 0, country.currency)}HT`}</div>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function AddPrice() {
  return (
    <div
      style={{
        borderRadius: '7px',
        color: 'white',
        padding: '5px 10px',
        backgroundColor: 'salmon',
        width: 'fit-content',
      }}
    >
      Ajouter
    </div>
  );
}
