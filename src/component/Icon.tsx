const icons = {
  email: '📧',
  phone: '📞',
  good: '✅',
};

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return <>{icons[name]}</>;
}
