'use client'

import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Toolbar } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import HeaderSideMenu from './components/Menu/HeaderSideMenu'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const mdTheme = createTheme()
  const queryClient = new QueryClient()

  return (
    <html lang='ja'>
      <head>
        <title>NextAdminExample</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
