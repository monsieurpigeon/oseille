import { Heading, Link, LinkProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FontProps = { children: ReactNode };
export const MyH1 = ({ children }: FontProps) => {
  return (
    <Heading
      as="h1"
      size="2xl"
    >
      {children}
    </Heading>
  );
};
export const MyH2 = ({ children }: FontProps) => {
  return (
    <Heading
      as="h2"
      size="xl"
    >
      {children}
    </Heading>
  );
};
export const MyH3 = ({ children }: FontProps) => {
  return (
    <Heading
      as="h3"
      size="lg"
    >
      {children}
    </Heading>
  );
};

export const MySubtitle = ({ children }: FontProps) => {
  return (
    <Heading
      as="h4"
      size="md"
    >
      {children}
    </Heading>
  );
};

export const MyLink = ({ children, ...props }: FontProps & LinkProps) => {
  return <Link {...props}>{children}</Link>;
};
