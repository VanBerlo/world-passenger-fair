import { createTheme } from '@mui/material';
import { amber, blue, blueGrey, cyan, green, lightBlue, lime, orange, pink, purple, red } from '@mui/material/colors';
// import Graphik from "../../public/assets/fonts/Graphik/Graphik-Regular.ttf";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: { main: purple[400] },
    secondary: { main: amber['200'], contrastText: '#fff' },

    success: { main: green[400] },
    error: { main: red['A400'] },
    warning: { main: amber['900'], contrastText: '#fff' },

    exhibitA: {
      light: lightBlue[500],
      main: lightBlue[700],
      dark: lightBlue[900],
    },
    exhibitB: {
      light: lime['A200'],
      main: lime['A400'],
      dark: lime['A700'],
    },
    exhibitC: {
      light: purple['600'],
      main: purple['800'],
      dark: purple['900'],
    },
  },

  shape: {
    borderRadius: 24,
    heightUnit: 100,
  },
  typography: {
    // fontSize: '12px',
    fontFamily: 'Graphik, Arial',
  },
  status: {
    danger: orange[500],
  },

  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      //   @font-face {
      //     font-family: 'Graphik';
      //     font-display: swap;
      //     font-weight: 400;
      //     src: local('Graphik'), local('Raleway-Regular'), url(${Graphik}) format('ttf');
      //     unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      //   }
      // `,
    },
    MuiCard: {},
    MuiGrid: {
      defaultProps: {
        // sx: { border: '1px solid lightgrey' },
        // gap: 1,
      },
    },
  },
});

export default theme;
