'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiMenuItem: {}
  }
});

type Props = {
  children: React.ReactNode;
};

const MuiWrapper = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiWrapper;
