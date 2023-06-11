import { Customer } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerDisplay } from './CustomerDisplay';
import { EditCustomerAction } from './actions/EditCustomerAction';

export const CustomerDetail = ({ selected }: { selected: Customer }) => {
  return (
    <>
      <MyHeader>
        <MyH1>Détail</MyH1>
        <EditCustomerAction customer={selected} />
      </MyHeader>

      <CustomerDisplay customer={selected} />
    </>
  );
};
