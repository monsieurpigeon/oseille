import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Customer } from '../../../backend';
import { DetailButton, EditButton } from '../../../component/buttons';
import { MyHeader } from '../../../component/layout/page-layout/MyHeader';
import { CustomerDisplay } from './CustomerDisplay';
import { CustomerDocuments } from './CustomerDocuments';

export const CustomerDetail = () => {
  const navigate = useNavigate();
  const {
    customers: [selected],
  } = useLoaderData() as { customers: Customer[] };

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
