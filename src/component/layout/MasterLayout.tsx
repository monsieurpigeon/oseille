import { useEffect } from 'react';
import { Outlet, useRevalidator } from 'react-router-dom';
import { relDb } from '../../backend';
import { TopBar } from '../TopBar';
import { WelcomeModal } from '../modal/welcome-modal/WelcomeModal';

export function MasterLayout() {
  const revalidator = useRevalidator();

  useEffect(() => {
    const observer = relDb.changes({ since: 'now', live: true }).on('change', (e) => {
      console.log('change', e);
      revalidator.revalidate();
    });
    return () => observer.cancel();
  }, []);

  return (
    <div>
      <TopBar />
      <Outlet />
      <WelcomeModal />
    </div>
  );
}
