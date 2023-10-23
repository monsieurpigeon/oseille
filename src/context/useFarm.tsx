import { useState } from 'react';
import { Farm } from '../backend';

export function useFarm() {
  const [farm, setFarm] = useState<Farm>();

  return { farm };
}
