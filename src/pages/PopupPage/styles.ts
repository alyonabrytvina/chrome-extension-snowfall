import { Box, styled, Typography } from '@mui/material'

export const StyledPopupWrapper = styled(Box)(({ theme }) => ({
  width: 300,
  maxHeight: 110,
  minHeight: 110,
  height: '100%',
  padding: `${theme.spacing(4)} 0 ${theme.spacing(2)}`,
  textAlign: 'center',
  background: 'radial-gradient(circle, rgba(255,255,255,1) 54%, rgba(255,255,255,1) 70%, rgba(140,108,237,0.4649568445542279) 100%)'
}))

export const StyledTitle = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(2.5)}`,
  color: theme.palette.primary.main,
  WebkitTextStoke: `1.6px ${theme.palette.primary.main}`
}))
