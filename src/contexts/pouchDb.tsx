import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import { createContext, ReactNode, useContext, useMemo } from 'react';

PouchDb.plugin(find);

const PouchContext = createContext(undefined as any);

export const PouchProvider = ({ children }: { children: ReactNode }) => {
  const db = useMemo(() => new PouchDb('hello_world'), []);

  return <PouchContext.Provider value={{ db }}>{children}</PouchContext.Provider>;
};

export function usePouch() {
  return useContext(PouchContext);
}
