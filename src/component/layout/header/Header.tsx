import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: silver;
`;

export function Header() {
  return (
    <StyledHeader>
      <Link to="/">Oseille</Link>
      <Link to="/profile">Profil</Link>
    </StyledHeader>
  );
}
