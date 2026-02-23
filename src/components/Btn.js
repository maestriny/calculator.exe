import { Button } from 'react95';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  grid-column: ${({ $gridColumn }) => $gridColumn || 'auto'};
  grid-row: ${({ $gridRow }) => $gridRow || 'auto'};
  min-width: 0;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  padding: 2px 4px;
`;

function Btn({ label, onClick, gridColumn, gridRow, disabled }) {
  return (
    <StyledButton
      $gridColumn={gridColumn}
      $gridRow={gridRow}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
}

export default Btn;
