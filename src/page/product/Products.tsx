import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { DEFAULT_TAX } from '../../utils/defaults';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export function Products() {
  const snap = useSnapshot(store);
  const { id } = useParams();

  const navigate = useNavigate();

  const selected = useMemo(() => (id ? store.products.find((el) => el.id === id) : undefined), [id, snap]);

  const { isTVA } = useFarmParameters();

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Produits</MyH1>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('/product/create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList>
          {store.products.map((entity) => (
            <ListItem
              key={entity.id}
              isSelected={selected?.id === entity.id}
              onClick={() => navigate(entity.id === id ? `/product` : `/product/${entity.id}`)}
            >
              <Flex width="100%">
                <div>{`${entity.name} /${entity.unit}`}</div>
                <Spacer />
                <Text whiteSpace="nowrap">{isTVA && `TVA: ${TVAFormatter(entity.tva || DEFAULT_TAX)}`}</Text>
              </Flex>
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
