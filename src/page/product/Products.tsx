import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Product, store } from '../../backend';
import { CatalogCard, CatalogList, CatalogueLayout } from '../../component/catalog/Catalog';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { CreateProduct } from './CreateProduct';
import { ProductDetail } from './ProductDetail';

export function Products() {
  const [selected, setSelected] = useState<Product>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.products.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  return (
    <ScreenLayout>
      <CatalogueLayout>
        <CatalogList
          title="Mes Produits"
          slot={<CreateProduct />}
        >
          {store.products.map((entity) => (
            <CatalogCard
              key={entity.id}
              label={`${entity.name} - ${entity.price || 0}€ /${entity.unit}`}
              selected={selected?.id === entity.id}
              onClick={() => setSelected((e) => (e === entity ? undefined : entity))}
            />
          ))}
        </CatalogList>
        <ProductDetail selected={selected} />
      </CatalogueLayout>
    </ScreenLayout>
  );
}
