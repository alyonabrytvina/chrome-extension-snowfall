import { Box, styled, Typography } from '@mui/material';

export const StyledPopupWrapper = styled(Box)(() => ({
    width: 300,
    textAlign: 'center',
    background: 'radial-gradient(circle, rgba(255,255,255,1) 54%, rgba(255,255,255,1) 70%, rgba(140,108,237,0.4649568445542279) 100%)'
}));

export const StyledTitle = styled(Typography)(({theme}) => ({
    padding: '24px 12px',
    color: theme.palette.primary.main,
    WebkitTextStoke: `1.6px ${theme.palette.primary.main}`
}))

