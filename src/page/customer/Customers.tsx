import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Customer, store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerDetail } from './CustomerDetail';
import { CreateCustomerAction } from './actions/CreateCustomerAction';

export function Customers() {
  const [selected, setSelected] = useState<Customer>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.customers.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Clients</MyH1>
          <CreateCustomerAction />
        </MyHeader>
        <MyScrollList>
          {store.customers.map((entity) => (
            <ListItem
              key={entity.id}
              isSelected={selected?.id === entity.id}
              onClick={() => setSelected((e) => (e?.id === entity.id ? undefined : { ...entity }))}
            >
              {entity.name}
            </ListItem>
          ))}
        </MyScrollList>
      </MySide>
      <MySide>{selected && <CustomerDetail selected={selected} />}</MySide>
    </MyPage>
  );
}
