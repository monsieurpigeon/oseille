import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DetailButton, EditButton } from '../../../component/buttons';
import { MyHeader } from '../../../component/layout/page-layout/MyHeader';
import { useData } from '../../../utils/DataContext';
import { CustomerDisplay } from './CustomerDisplay';
import { CustomerDocuments } from './CustomerDocuments';

export const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomer, customers } = useData();
  const selected = useMemo(() => (id ? getCustomer(id) : undefined), [id, customers]);

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
