import { Flex, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ListItem, ListItems } from '../list-items/ListItems';
import { MyH1 } from '../typography/MyFont';
import './style.css';
import { MyButton } from '../form/button/MyButton';

export function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <div className="catalog-layout">{children}</div>;
}

export function CatalogCard({
  label,
  onClick,
  selected,
  onDelete,
}: {
  label: string;
  onClick: () => void;
  onDelete?: () => void;
  selected?: boolean;
}) {
  return (
    <ListItem>
      <div
        onClick={onClick}
        onKeyDown={() => {}}
      >
        {selected && '>>'} {label}
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
        >
          X
        </button>
      )}
    </ListItem>
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
      <ListItems>{children}</ListItems>
    </div>
  );
}

export function CatalogDetail({
  children,
  onUpdate,
  show,
  onClear,
}: {
  children: React.ReactNode;
  onUpdate: () => void;
  show: boolean;
  onClear: () => void;
}) {
  return (
    <div>
      {show && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Flex alignItems="center">
            <MyH1>Détail</MyH1>
            <Spacer />
            <MyButton
              onClick={onUpdate}
              label="Enregistrer"
            />
          </Flex>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
        </div>
      )}
    </div>
  );
}
