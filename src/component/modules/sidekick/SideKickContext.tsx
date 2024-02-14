import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { SideKickFeeling } from './enums';

const GOOD_EMOJI = '👍';
const COMPUTE_EMOJI = '🧮';

type sideKickSayFunction = { sentence: string; feeling: SideKickFeeling; autoShutUp?: boolean };

const defaultValue: {
  sentence: string;
  emoji: string | undefined;
  feeling: SideKickFeeling | undefined;
  say: (props: sideKickSayFunction) => void;
  shutUp: () => void;
} = {
  sentence: '',
  emoji: undefined,
  feeling: undefined,
  say: (props: sideKickSayFunction) => undefined,
  shutUp: () => undefined,
};

const SideKickContext = createContext(defaultValue);

export function SideKickContextProvider({ children }: PropsWithChildren) {
  const [sentence, setSentence] = useState('');
  const [emoji, setEmoji] = useState<string | undefined>();
  const [feeling, setFeeling] = useState<SideKickFeeling>();

  return (
    <SideKickContext.Provider
      value={{
        sentence,
        emoji,
        feeling,
        say: (props: sideKickSayFunction) => {
          const { sentence, feeling, autoShutUp } = props;
          setSentence(sentence);
          setFeeling(feeling);
          switch (feeling) {
            case SideKickFeeling.GOOD:
              setEmoji(GOOD_EMOJI);
              break;
            case SideKickFeeling.COMPUTE:
              setEmoji(COMPUTE_EMOJI);
              break;
          }

          if (autoShutUp) {
            setTimeout(() => {
              setSentence('');
              setEmoji(undefined);
            }, 5000);
          }
        },
        shutUp: () => {
          setSentence('');
          setEmoji(undefined);
          setFeeling(undefined);
        },
      }}
    >
      {children}
    </SideKickContext.Provider>
  );
}

export function useSideKick() {
  const { sentence, emoji, feeling, say, shutUp } = useContext(SideKickContext);

  return { sentence, emoji, feeling, say, shutUp };
}
