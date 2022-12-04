import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: silver;
  padding: 10px;
`;

const StyledContent = styled.div`
  display: flex;
`;

export function MyFooter() {
  return (
    <StyledFooter>
      <StyledContent>
        <span>
          Fabriqué avec ❤️ & 🍅🍆🧄🥦🥬🌽🥕🧅🥔 à Bordeaux. Retrouvez le code source sur{' '}
          <a href="https://github.com/monsieurpigeon/oseille">Github</a>
        </span>
      </StyledContent>
    </StyledFooter>
  );
}
