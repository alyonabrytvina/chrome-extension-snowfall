import { createTheme } from '@mui/material';

const defaultTheme = {
    palette: {
        primary: {
            dark: '#2F3046',
            main: '#9A63FB',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        subtitle1: {
            fontSize: 24,
            fontWeight: 600,
            color: '#000',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    border: '1px solid #9A63FB',
                    borderRadius: 6,
                    padding: '6px 10px',
                    marginBottom: '12px',
                    background: 'mediumpurple',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: 'mediumpurple',
                        background: 'linear-gradient(0deg, rgba(212,212,255,1) 17%, rgba(255,255,255,1) 68%, rgba(140,108,237,0.4649568445542279) 100%)',
                    },
                },
            },
        },
    },
};

export const theme = createTheme(defaultTheme);
