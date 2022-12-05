import styled from 'styled-components';

const StyledScreenLayout = styled.div`
  position: relative;
  padding: 30px;
`;

export function MyScreenLayout({ children }: any) {
  return <StyledScreenLayout>{children}</StyledScreenLayout>;
}
