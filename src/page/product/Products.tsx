import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Product, loadProduct, loadProducts, store } from '../../backend';
import { getObject, getRelObject } from '../../backend/entity/common';
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
      {products.map((product: Product) => (
        <div key={product.id}>
          <Box
            cursor="pointer"
            onClick={() => {
              onOpen();
              loadProduct(product.id).then((result) => setProduct(product as unknown as Product));
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
