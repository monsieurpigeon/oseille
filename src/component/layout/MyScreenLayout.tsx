import styled from 'styled-components';

const StyledScreenLayout = styled.div`
  position: relative;
`;

export function MyScreenLayout({ children }: any) {
  return <StyledScreenLayout>{children}</StyledScreenLayout>;
}
