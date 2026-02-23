import { Window, WindowHeader, WindowContent } from 'react95';
import styled from 'styled-components';
import Menu from './Menu';
import Display from './Display';
import BtnGrid from './BtnGrid';
import Dialog from './Dialog';
import { useCalculator } from '../hooks/useCalculator';
import { useDrag } from '../hooks/useDrag';
import { useState } from 'react';

const StyledWindow = styled(Window)`
  width: 320px;

  .react95-window-content {
    padding: 4px;
  }
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const HeaderTitle = styled.span`
  font-weight: bold;
  margin-left: 2px;
`;

function Calculator() {
  const { state, dispatch } = useCalculator();
  const { ref, onMouseDown } = useDrag();
  const [helpOpen, setHelpOpen] = useState(false);
  const dialogOpen = !!state.error || helpOpen;
  const dialogTitle = state.error ? 'Error' : 'Help';
  const dialogMessage = state.error || "No help available.\nMath is supposed to hurt.";
  const dialogClose = state.error
    ? () => dispatch({ type: 'DISMISS_ERROR' })
    : () => setHelpOpen(false);

  return (
    <StyledWindow ref={ref}>
      {/* show error dialog if there's an error in the state */}
      {dialogOpen && (
        <Dialog
          title={dialogTitle}
          message={dialogMessage}
          onClose={dialogClose}
        />
      )}
      {/* header */}
      <StyledWindowHeader active onMouseDown={onMouseDown} style={{ cursor: 'grab' }}>
        <HeaderTitle>calculator.exe</HeaderTitle>
      </StyledWindowHeader>
      {/* menu */}
      <Menu onHelp={() => setHelpOpen(true)} />
      {/* display and the buttons */}
      <WindowContent>
        <Display value={state.displayValue} />
        <BtnGrid dispatch={dispatch} />
      </WindowContent>
    </StyledWindow>
  );
}

export default Calculator;
