import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { store } from '../../../backend';
import { DetailButton, EditButton } from '../../../component/buttons';
import { MyHeader } from '../../../component/layout/page-layout/MyHeader';
import { CustomerDisplay } from './CustomerDisplay';
import { CustomerDocuments } from './CustomerDocuments';

export const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const snap = useSnapshot(store);

  const selected = useMemo(() => (id ? store.customers.find((p) => p.id === id) : undefined), [id, snap]);

  if (!selected) return <></>;
  return (
    <StyledContainer>
      <MyHeader>
        <DetailButton />
        <EditButton onClick={() => navigate('edit')} />
        <Outlet />
      </MyHeader>

      <CustomerDisplay customer={selected} />
      <CustomerDocuments customer={selected} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;
