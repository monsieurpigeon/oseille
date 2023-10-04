import { Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';

export function CustomerPage() {
  const snap = useSnapshot(store);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selected = useMemo(() => (id ? store.customers.find((el) => el.id === id) : undefined), [id, snap]);
  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Clients</MyH1>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('/customer/create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList>
          {store.customers.map((entity) => (
            <ListItem
              key={entity.id}
              isSelected={selected?.id === entity.id}
              onClick={() => navigate(entity.id === id ? `/customer` : `/customer/${entity.id}${location.hash}`)}
            >
              {entity.name}
            </ListItem>
          ))}
        </MyScrollList>
      </MySide>
      <MySide>
        <Outlet />
      </MySide>
    </MyPage>
  );
}
