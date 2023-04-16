import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Input } from '@chakra-ui/react';
import './style.css';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { PriceNumberInput } from './PriceNumberInput';

const CUSTOMERS = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'];
const PRODUCTS = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'];

export function PriceTable() {
  const snap = useSnapshot(store);
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
            <Th style={{ position: 'fixed', backgroundColor: 'white', color: 'white', borderBottom: 'none' }}>\</Th>
            {store.customers.map((c) => (
              <Th key={c.id}>{c.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {store.products.map((p) => (
            <Tr key={p.id}>
              <Th style={{ position: 'sticky', left: '0px', backgroundColor: 'white', zIndex: 199 }}>
                {p.name} /{p.unit}
              </Th>
              {store.customers.map((c) => {
                const price = store.prices.find((price) => price.customer === c.id && price.product === p.id);
                return (
                  <Td key={c.id}>
                    <PriceNumberInput
                      product={p}
                      customer={c}
                      price={price}
                    />
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
