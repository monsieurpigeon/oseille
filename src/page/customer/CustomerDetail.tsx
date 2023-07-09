import styled from 'styled-components';
import { Customer } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerDisplay } from './CustomerDisplay';
import { CustomerDocuments } from './CustomerDocuments';
import { EditCustomerAction } from './actions/EditCustomerAction';

export const CustomerDetail = ({ selected }: { selected: Customer }) => {
  return (
    <StyledContainer>
      <MyHeader>
        <MyH1>Détail</MyH1>
        <EditCustomerAction customer={selected} />
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
