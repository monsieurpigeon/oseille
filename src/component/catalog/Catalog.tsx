import { Flex, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MyH1 } from '../typography/MyFont';
import './style.css';
import { MyButton } from '../form/button/MyButton';

export function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <div className="catalog-layout">{children}</div>;
}

export function CatalogCard({ label, onClick, selected }: { label: string; onClick: () => void; selected?: boolean }) {
  return (
    <div
      className={`list-item ${selected && 'selected'}`}
      onClick={onClick}
      onKeyDown={() => {}}
    >
      <div>{label}</div>
    </div>
  );
}

export function CatalogMasterCard({ label, children }: { label: string | ReactNode; children: ReactNode }) {
  return (
    <div className="catalog-master-card">
      <div style={{ height: '35px' }}>{label}</div>
      <div className="catalog-master-card-content">{children}</div>
    </div>
  );
}

export function CatalogList({ title, slot, children }: { title: string; slot?: ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <Flex alignItems="center">
        <MyH1>{title}</MyH1>
        <Spacer />
        {slot}
      </Flex>
      <Spacer />
      <Flex
        direction="column"
        gap={3}
        style={{ height: '100%', overflowY: 'scroll' }}
      >
        {children}
      </Flex>
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
