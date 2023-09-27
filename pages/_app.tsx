import '../styles/globals.css';
import type { AppProps } from 'next/app';
import FluidLayout from '../components/CustomContainer';
import theme from '../themes/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#fbfbfb",
        background: 'linear-gradient(147deg, grey) 0%,  lightgrey 100%)',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Box>
  );
}
