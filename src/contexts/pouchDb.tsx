import PouchDB from 'pouchdb';
import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import { createContext, ReactNode, useContext } from 'react';

PouchDb.plugin(find);
const db = new PouchDB('hello_world');
db.allDocs().then((data) => {
  console.log(data);
});
const PouchContext = createContext(undefined as any);

export const PouchProvider = ({ children }: { children: ReactNode }) => {
  return <PouchContext.Provider value={{ db }}>{children}</PouchContext.Provider>;
};

export function usePouch() {
  return useContext(PouchContext);
}
