import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Product, Unit, store, updateProduct } from '../../backend';
import { CatalogCard, CatalogDetail, CatalogList, CatalogueLayout } from '../../component/catalog/Catalog';
import { NumberLabelInput } from '../../component/form/NumberInput';
import { TextLabelInput } from '../../component/form/TextInput';
import { MySelect } from '../../component/form/select/MySelect';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { PRODUCT_UNITS } from '../../utils/defaults';
import { CreateProduct } from './CreateProduct';

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
              onClick={() => setSelected(entity)}
            />
          ))}
        </CatalogList>
        <CatalogDetail
          onUpdate={() => selected && updateProduct({ ...selected })}
          show={!!selected}
          onClear={() => setSelected(undefined)}
        >
          {selected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <div>
                <TextLabelInput
                  value={selected.name}
                  label="Nom"
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                />
                <NumberLabelInput
                  value={selected.price || 0}
                  label="Prix"
                  onChange={(e) => setSelected({ ...selected, price: +e.target.value })}
                />
                <MySelect
                  options={PRODUCT_UNITS}
                  value={selected.unit}
                  onChange={(e) => {
                    setSelected({ ...selected, unit: e.target.value as Unit });
                  }}
                  placeholder={'unite ...'}
                />
              </div>
            </div>
          )}
        </CatalogDetail>
      </CatalogueLayout>
    </ScreenLayout>
  );
}
