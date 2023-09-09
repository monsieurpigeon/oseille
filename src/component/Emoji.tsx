const emojis = {
  email: '📧',
  phone: '📞',
};

type EmojiName = keyof typeof emojis;

interface EmojiProps {
  name: EmojiName;
}

export function Emoji({ name }: EmojiProps) {
  return <>{emojis[name]}</>;
}
