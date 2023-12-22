import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import { PopupPage } from './PopupPage'

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)

const root = createRoot(appContainer)
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <PopupPage/>
        </ThemeProvider>
    </React.StrictMode>
)
