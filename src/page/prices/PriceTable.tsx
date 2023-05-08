import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { priceFormatter } from '../../utils/formatter';
import { PriceNumberInput } from './PriceNumberInput';
import './style.css';

export function PriceTable() {
  const snap = useSnapshot(store);
  const [currentEdit, setCurrentEdit] = useState(['', '']);
  return (
    <TableContainer
      overflowY="scroll"
      overflowX="scroll"
      height="100%"
      className="hide-scroll"
    >
      <Table>
        <Thead>
          <Tr style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: 200 }}>
            <Th style={{ borderBottom: 'none' }}></Th>
            <Th>Par Défaut</Th>
            {store.customers.map((c) => (
              <Th key={c.id}>{c.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {store.products.map((p) => {
            const defaultPrice = store.prices.find((price) => price.customer === 'DEFAULT' && price.product === p.id);
            return (
              <Tr key={p.id}>
                <Th style={{ position: 'sticky', left: '0px', backgroundColor: 'white', zIndex: 199 }}>
                  {p.name} /{p.unit}
                </Th>
                <Td
                  style={{
                    backgroundColor: defaultPrice?.value ? 'gainsboro' : 'white',
                    borderRight: '3px solid grey',
                  }}
                >
                  {(currentEdit[0] !== 'DEFAULT' || currentEdit[1] !== p.id) && (
                    <button onClick={() => setCurrentEdit(['DEFAULT', p.id])}>
                      {defaultPrice?.value ? `${priceFormatter(defaultPrice.value)}HT` : <AddPrice />}
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
                {store.customers.map((c) => {
                  const directPrice = store.prices.find((price) => price.customer === c.id && price.product === p.id);
                  const price = directPrice || defaultPrice;
                  return (
                    <Td
                      key={c.id}
                      style={{
                        backgroundColor: directPrice ? 'powderblue' : defaultPrice ? 'whitesmoke' : 'white',
                      }}
                    >
                      {(currentEdit[0] !== c.id || currentEdit[1] !== p.id) && (
                        <button onClick={() => setCurrentEdit([c.id, p.id])}>
                          {price?.value ? `${priceFormatter(price?.value || 0)}HT` : <AddPrice />}
                        </button>
                      )}
                      {currentEdit[0] === c.id && currentEdit[1] === p.id && (
                        <PriceNumberInput
                          product={p}
                          customer={c}
                          price={directPrice}
                          value={price?.value || 0}
                          onClose={() => setCurrentEdit(['', ''])}
                        />
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
    <div style={{ borderRadius: '7px', color: 'white', padding: '5px 10px', backgroundColor: 'salmon' }}>Ajouter</div>
  );
}
