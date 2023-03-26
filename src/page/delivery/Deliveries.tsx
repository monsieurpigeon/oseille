import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Delivery, store } from '../../backend';
import { CatalogCard, CatalogDetail, CatalogList, CatalogueLayout } from '../../component/catalog/Catalog';
import { TextLabelInput } from '../../component/form/TextInput';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { CreateDeliveries } from './CreateDeliveries';

export function Deliveries() {
  const [selected, setSelected] = useState<Delivery>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  return (
    <ScreenLayout>
      <CatalogueLayout>
        <CatalogList
          title="Mes Livraisons"
          slot={<CreateDeliveries />}
        >
          {store.deliveries.map((entity) => (
            <CatalogCard
              key={entity.id}
              label={`${entity.id}`}
              selected={selected?.id === entity.id}
              onClick={() => setSelected((e) => (e === entity ? undefined : entity))}
            />
          ))}
        </CatalogList>
        <CatalogDetail
          onUpdate={console.log}
          show={!!selected}
          onClear={() => setSelected(undefined)}
        >
          {selected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <div>
                <TextLabelInput
                  value={selected.id}
                  label="Nom"
                  onChange={(e) => setSelected({ ...selected, id: e.target.value })}
                />
              </div>
            </div>
          )}
        </CatalogDetail>
      </CatalogueLayout>
    </ScreenLayout>
  );
}
