'use client'

import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Toolbar } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import HeaderSideMenu from './components/Menu/HeaderSideMenu'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const mdTheme = createTheme()

  return (
    <html lang='ja'>
      <head>
        <title>NextAdminExample</title>
      </head>
      <body>
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeaderSideMenu />
            <Box
              component='main'
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                {children}
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
