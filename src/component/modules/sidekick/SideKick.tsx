import { useEffect, useState } from 'react';
import { MyH3 } from '../../typography/MyFont';
import { Flex } from '@chakra-ui/react';

const emojis = ['😃', '😘', '😁', '😅', '😂', '🤣', '😇', '🙃', '🤨', '🥸', '🫣', '😉'];
export function SideKick() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % emojis.length);
      setShow(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Flex
      alignItems="center"
      gap={4}
      onMouseEnter={() => {
        setShow(true);
      }}
    >
      {show && 'Bonjour, je suis votre assistant personnalise '}
      <MyH3>{emojis[index]}</MyH3>
    </Flex>
  );
}
