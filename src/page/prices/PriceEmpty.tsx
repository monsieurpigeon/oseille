import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  emptyCustomer: boolean;
  emptyProduct: boolean;
}

export function PriceEmpty({ emptyCustomer, emptyProduct }: Props) {
  const navigate = useNavigate();

  return (
    <Flex
      marginTop={10}
      gap={4}
      alignItems="flex-start"
    >
      {emptyCustomer && (
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
      {emptyProduct && (
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
