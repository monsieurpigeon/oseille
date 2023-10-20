import { useEffect, useState } from 'react';
import { Farm, getFarm, onFarmChange } from '../backend';

export function useFarm() {
  const [farm, setFarm] = useState<Farm>();
  const refreshFarm = () => {
    console.log('REFRESH FARM');
    getFarm().then(setFarm);
  };

  useEffect(() => {
    refreshFarm();
    const observer = onFarmChange(refreshFarm);
    return () => {
      observer.cancel();
    };
  }, []);

  return { farm };
}
