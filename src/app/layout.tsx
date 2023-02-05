import '@/styles/globals.css'
import { FC, PropsWithChildren } from 'react'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='ja'>
      <head>
        <title>NextAdminExample</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
