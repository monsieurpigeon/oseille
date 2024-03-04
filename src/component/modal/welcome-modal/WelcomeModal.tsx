import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useState } from 'react';
import { WelcomeFormModal } from './WelcomeFormModal';
import { WelcomePresentationModal } from './WelcomePresentationModal';

export const welcomeAtom = atomWithStorage('welcome', true);

export function WelcomeModal() {
  const [welcome] = useAtom(welcomeAtom);
  const [welcomeSteps, setWelcomeSteps] = useState(0);

  return (
    <>
      {welcome && welcomeSteps === 0 && <WelcomePresentationModal onConfirm={() => setWelcomeSteps(1)} />}
      {welcome && welcomeSteps === 1 && <WelcomeFormModal />}
    </>
  );
}
