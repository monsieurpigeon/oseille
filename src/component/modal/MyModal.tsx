import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

const StyledModal = styled.div`
  position: fixed;
  inset: 0; /* inset sets all 4 values (top right bottom left) much like how we set padding, margin etc., */
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
`;

const StyledModalContent = styled.div`
  width: 70%;
  height: 70%;
  background-color: #282c34;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export function MyModal({ children, isOpen, handleClose }: ModalProps) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  const wrapper = document.getElementById('modal');

  if (!isOpen) return null;

  if (wrapper) {
    return createPortal(
      <StyledModal>
        <StyledModalContent>{children}</StyledModalContent>
      </StyledModal>,
      wrapper,
    );
  } else {
    return <div>ERROR</div>;
  }
}