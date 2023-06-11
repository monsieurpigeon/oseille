import { Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Product, store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { ProductDetail } from './ProductDetail';
import { CreateProductAction } from './actions/CreateProductAction';

export function Products() {
  const [selected, setSelected] = useState<Product>();
  const snap = useSnapshot(store);

  const { isTVA } = useFarmParameters();

  useEffect(() => {
    const updated = store.products.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected({ ...updated });
    }
  }, [snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Produits</MyH1>
          <CreateProductAction />
        </MyHeader>
        <MyScrollList>
          {store.products.map((entity) => (
            <ListItem
              key={entity.id}
              isSelected={selected?.id === entity.id}
              onClick={() => setSelected((e) => (e?.id === entity.id ? undefined : { ...entity }))}
            >
              <Flex width="100%">
                <div>{`${entity.name} /${entity.unit}`}</div>
                <Spacer />
                <Text whiteSpace="nowrap">{isTVA && <div>TVA: {TVAFormatter(entity.tva)}</div>}</Text>
              </Flex>
            </ListItem>
          ))}
        </MyScrollList>
      </MySide>
      <MySide>{selected && <ProductDetail selected={selected} />}</MySide>
    </MyPage>
  );
}
