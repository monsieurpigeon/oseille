import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { priceFormatter } from '../../utils/formatter';
import { PriceNumberInput } from './PriceNumberInput';
import './style.css';

export function PriceTable() {
  const snap = useSnapshot(store);
  const navigate = useNavigate();
  const [currentEdit, setCurrentEdit] = useState(['', '']);
  const [customerLength, productLength] = [store.customers.length, store.products.length];
  if (customerLength === 0 || productLength === 0) {
    return (
      <Flex
        marginTop={10}
        gap={4}
        alignItems="flex-start"
      >
        {customerLength === 0 && (
          <Box
            bg="blue.50"
            border="2px solid"
            borderColor="blue.200"
            padding={2}
            onClick={() => navigate('../customer/create')}
            className="clickable"
            borderRadius={10}
          >
            <Text>Ajoutez un premier client en cliquant ici</Text>
          </Box>
        )}
        {productLength === 0 && (
          <Box
            bg="blue.50"
            border="2px solid"
            borderColor="blue.200"
            padding={2}
            onClick={() => navigate('../product/create')}
            className="clickable"
            borderRadius={10}
          >
            <Text>Ajoutez un premier produit en cliquant ici</Text>
          </Box>
        )}
      </Flex>
    );
  }
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
