const Colors = {
    red: "rgb(183,28,28)",
    blue: "rgb(32,84,189)",
    gold: "rgb(191, 155, 48)"
}


import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: "#000000",
    },
  },
});


export default Colors;