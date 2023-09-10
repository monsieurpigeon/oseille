import { PropsWithChildren, createContext, useContext, useState } from 'react';

const defaultValue: { sentence: string; say: (sentence: string, autoShutUp?: boolean) => void; shutUp: () => void } = {
  sentence: '',
  say: (sentence: string, autoShutUp?: boolean) => undefined,
  shutUp: () => undefined,
};

const SideKickContext = createContext(defaultValue);

export function SideKickContextProvider({ children }: PropsWithChildren) {
  const [sentence, setSentence] = useState('');

  return (
    <SideKickContext.Provider
      value={{
        sentence,
        say: (sentence: string, autoShutUp?: boolean) => {
          setSentence(sentence);
          if (autoShutUp) {
            setTimeout(() => {
              setSentence('');
            }, 3000);
          }
        },
        shutUp: () => {
          setSentence('');
        },
      }}
    >
      {children}
    </SideKickContext.Provider>
  );
}

export function useSideKick() {
  const { sentence, say, shutUp } = useContext(SideKickContext);

  return { sentence, say, shutUp };
}
