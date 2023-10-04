import { atomWithStorage } from 'jotai/vanilla/utils';

export const selectedOrdersAtom = atomWithStorage('selected-orders', {});
