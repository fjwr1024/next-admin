import '@/styles/globals.css'
import { FC, PropsWithChildren } from 'react'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='ja'>
      <head>
        <title>Next13</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
