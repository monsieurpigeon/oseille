import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Product, store } from '../../backend';
import { getObject } from '../../backend/entity/common';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';
import { CreateProduct } from './CreateProduct';
import { FocusProduct } from './FocusProduct';

export function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products } = useSnapshot(store);
  const [product, setProduct] = useState<Product>();

  return (
    <MyScreenLayout>
      <Flex
        gap={4}
        alignItems="center"
      >
        <MyH1>Produits</MyH1>
        <CreateProduct />
      </Flex>
      {products.map((product: any) => (
        <div key={product._id}>
          <Box
            cursor="pointer"
            onClick={() => {
              onOpen();
              getObject(product._id).then((product) => setProduct(product as unknown as Product));
            }}
            p={4}
          >
            <Flex
              w={340}
              justifyContent="space-between"
            >
              <Text>{product.name}</Text>
              <Text>
                € / {product.unit} : {product.price.toFixed(2)}
              </Text>
            </Flex>
          </Box>
        </div>
      ))}

      {!!product && (
        <FocusProduct
          isOpen={isOpen}
          onClose={onClose}
          product={product}
          onOpen={onOpen}
        />
      )}
    </MyScreenLayout>
  );
}
