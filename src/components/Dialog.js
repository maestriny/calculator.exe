import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import errorIcon from '../assets/error.ico';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-left: 4px;
`;

const Body = styled(WindowContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px;
`;

const IconRow = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const ErrorIcon = styled.img`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
`;

const Message = styled.p`
  margin: 0;
  font-size: 16px;
  white-space: pre-line;
  text-align: center;
  width: 100%;
`;

function Dialog({ title = 'Error', message, onClose }) {
  return (
    <Overlay>
      <Window style={{ width: 320 }}>
        <StyledWindowHeader>{title}</StyledWindowHeader>
        <Body>
          <IconRow>
            <ErrorIcon src={errorIcon} alt="error" />
            <Message>{message}</Message>
          </IconRow>
          <Button style={{ width: 100 }} onClick={onClose}>OK</Button>
        </Body>
      </Window>
    </Overlay>
  );
}

export default Dialog;
