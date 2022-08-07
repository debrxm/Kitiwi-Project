// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import './App.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemePrimaryColor>
        <NotistackProvider>
          <ScrollToTop />
          <Router />
        </NotistackProvider>
      </ThemePrimaryColor>
    </ThemeProvider>
  );
}
