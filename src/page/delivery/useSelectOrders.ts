import { atomWithStorage } from 'jotai/vanilla/utils';

export const selectedOrdersAtom = atomWithStorage<{ [key: string]: boolean }>('selected-orders', {});
