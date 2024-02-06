import { Flex } from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
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
    <Flex
      direction="column"
      gap="8px"
      grow={1}
    >
      <MyHeader>
        <DetailButton />
        <EditButton onClick={() => navigate('edit')} />
        <Outlet />
      </MyHeader>

      <CustomerDisplay customer={selected} />
      <CustomerDocuments />
    </Flex>
  );
};
