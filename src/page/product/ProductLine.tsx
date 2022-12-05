import { MyModal } from '../../component/modal/MyModal';
import styled from 'styled-components';
import { useState } from 'react';
import { ProductEditModal } from './ProductEditModal';
import { MyButton } from '../../component/form/button/MyButton';

const StyledProductItem = styled.div`
  display: flex;
  padding: 10px;
  background: silver;
  border: 1px solid grey;
  border-radius: 5px;
  width: 400px;
`;

const StyledLine = styled.div`
  display: flex;
  gap: 10px;

  &:hover {
    ${StyledProductItem} {
      background: lightgrey;
      border: 1px solid aqua;
    }
  }
`;

const StyledProductName = styled.div`
`;

const StyledProductPrice = styled.div`
  flex-grow: 1;
  text-align: right;
`;

export function ProductLine({ product }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledLine>
      <StyledProductItem key={product._id}>
        <StyledProductName>{product.name}</StyledProductName>
        <StyledProductPrice>€ / {product.unit} : {product.price.toFixed(2)}</StyledProductPrice>
      </StyledProductItem>
      <MyButton
        onClick={() => {
          setIsOpen((v) => !v);
        }}
        label="✏️"
      />
      {isOpen && (
        <MyModal
          isOpen={isOpen}
          handleClose={() => {
            setIsOpen(false);
          }}
        >
          <ProductEditModal
            product={product}
            handleClose={() => {
              setIsOpen(false);
            }}
          />
        </MyModal>
      )}
    </StyledLine>
  );
}