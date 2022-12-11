import { useEffect, useState } from 'react';

const emojis = ['😃', '😘', '😁', '😅', '😂', '🤣', '😇', '🙃', '🤨', '🥸', '🫣', '😉'];
export function SideKick() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % emojis.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  return <p>{emojis[index]}</p>;
}
