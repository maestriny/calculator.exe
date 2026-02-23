import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import Calculator from './components/Calculator';
import DesktopIcons from './components/DesktopIcons';

const Desktop = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.desktopBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

function App() {
  return (
    <ErrorBoundary>
      <Desktop>
        <DesktopIcons />
        <Calculator />
      </Desktop>
    </ErrorBoundary>
  );
}

export default App;
