import { Flex, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MyH1 } from '../typography/MyFont';
import './style.css';
import { MyButton } from '../form/button/MyButton';

export function CatalogMasterCard({ label, children }: { label: string | ReactNode; children: ReactNode }) {
  return (
    <div className="catalog-master-card">
      <div style={{ height: '35px' }}>{label}</div>
      <div className="catalog-master-card-content">{children}</div>
    </div>
  );
}

export function CatalogDetail({
  children,
  onUpdate,
  show,
}: {
  children: React.ReactNode;
  onUpdate?: () => void;
  show: boolean;
}) {
  return (
    <div>
      {show && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Flex alignItems="center">
            <MyH1>Détail</MyH1>
            <Spacer />
            {onUpdate && (
              <MyButton
                onClick={onUpdate}
                label="Enregistrer"
              />
            )}
          </Flex>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
        </div>
      )}
    </div>
  );
}
