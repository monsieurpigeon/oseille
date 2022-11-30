import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: cornsilk;
`;

export function Button({
  label,
  onClick,
}: {
  label: String;
  onClick: () => void;
}) {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}
