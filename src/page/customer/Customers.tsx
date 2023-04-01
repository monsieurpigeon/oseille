import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Customer, store, updateCustomer } from '../../backend';
import { CatalogCard, CatalogDetail, CatalogList, CatalogueLayout } from '../../component/catalog/Catalog';
import { TextLabelInput } from '../../component/form/TextInput';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { CreateCustomer } from './CreateCustomer';

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
    <ScreenLayout>
      <CatalogueLayout>
        <CatalogList
          title="Mes Clients"
          slot={<CreateCustomer />}
        >
          {store.customers.map((entity) => (
            <CatalogCard
              key={entity.id}
              label={`${entity.name}`}
              selected={selected?.id === entity.id}
              onClick={() => setSelected((e) => (e === entity ? undefined : entity))}
            />
          ))}
        </CatalogList>
        <CatalogDetail
          onUpdate={() => selected && updateCustomer({ ...selected })}
          show={!!selected}
        >
          {selected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <div>
                <TextLabelInput
                  value={selected.name}
                  label="Nom"
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                />
                <TextLabelInput
                  value={selected.address1}
                  label="Adresse 1"
                  onChange={(e) => setSelected({ ...selected, address1: e.target.value })}
                />
                <TextLabelInput
                  value={selected.address2}
                  label="Adresse 2"
                  onChange={(e) => setSelected({ ...selected, address2: e.target.value })}
                />
                <TextLabelInput
                  value={selected.zip}
                  label="Code postal"
                  onChange={(e) => setSelected({ ...selected, zip: e.target.value })}
                />
                <TextLabelInput
                  value={selected.city}
                  label="Ville"
                  onChange={(e) => setSelected({ ...selected, city: e.target.value })}
                />
              </div>
            </div>
          )}
        </CatalogDetail>
      </CatalogueLayout>
    </ScreenLayout>
  );
}
