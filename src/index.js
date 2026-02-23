import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import GlobalStyles from './GlobalStyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <App />
    </ThemeProvider>
  </>
);
