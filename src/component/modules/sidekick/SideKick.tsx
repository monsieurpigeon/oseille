import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MyH3 } from '../../typography/MyFont';
import { useSideKick } from './SideKickContext';
import { SideKickFeeling } from './enums';

const sideKickColors: { [key in SideKickFeeling]: string } = {
  [SideKickFeeling.GOOD]: 'green',
  [SideKickFeeling.COMPUTE]: 'purple',
  [SideKickFeeling.NEUTRAL]: 'grey',
  [SideKickFeeling.DANGER]: 'red',
  [SideKickFeeling.WARNING]: 'orange',
};

const emojis = ['😃', '😘', '😁', '😅', '😂', '🤣', '😇', '🙃', '🤨', '🥸', '🫣', '😉'];

export function SideKick() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % emojis.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const { sentence, emoji, feeling } = useSideKick();

  return (
    <Flex
      alignItems="center"
      position="absolute"
      right="10px"
      gap={4}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      z-index={100}
    >
      {isOpen && (
        <Sentence feeling={feeling}>Bonjour, je suis Max, votre cyber‑bénévole, je suis là pour vous aider.</Sentence>
      )}
      {sentence && <Sentence feeling={feeling}>{sentence}</Sentence>}
      <MyH3 className="no-select">{emoji || emojis[index]}</MyH3>
    </Flex>
  );
}

function Sentence({ children, feeling }: { children: React.ReactNode; feeling?: SideKickFeeling }) {
  return (
    <Box
      border={`3px solid ${sideKickColors[feeling || SideKickFeeling.NEUTRAL]}`}
      position="absolute"
      padding="12px"
      borderRadius="20px"
      borderBottomRightRadius={0}
      borderTopWidth="1px"
      borderLeftWidth="2px"
      backgroundColor="#f3fff0"
      width="350px"
      bottom="33px"
      right="30px"
      lineHeight="24px"
    >
      {children}
    </Box>
  );
}
