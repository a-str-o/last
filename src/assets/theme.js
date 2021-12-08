import { createMuiTheme} from '@material-ui/core/styles';


export 

const theme = createMuiTheme({
    palette: {
    primary: {
      light: '#39aaf9',
      main: '#39aaf9',
      dark: '#39aaf9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#39aaf9',
      main: '#39aaf9',
      dark: '#39aaf9',
      contrastText: '#39aaf9',
    },
        text : {
            primary : '#495057',
            secondary : '#495057'
        }
      },
      typography: {
        fontFamily: ['Montserrat',
          'sans-serif'
        ].join(','),
      },
      h1 : {
        fontSize : "24px"
      },
      props: {
        MuiTypography: {
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            subtitle1: 'h4',
            subtitle2: 'h4',
            body1: 'p',
            body2: 'span',
          },
        },
      },
  });

  