interface ListItemsProps {
  children: React.ReactNode;
}

interface ListItemProps {
  children: React.ReactNode;
}

export function ListItems({ children }: ListItemsProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      {children}
    </div>
  );
}

export function ListItem({ children }: ListItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
}
