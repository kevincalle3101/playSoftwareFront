import React, { FC, PropsWithChildren } from 'react'
import "@/app/ui/globals.css"
import { poppins } from './ui/fonts';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
        <body className={`bg-gradient-to-r from-indigo-500 via-indigo-500 to-blue-500 antialiased ${poppins}`}>{children}</body>
    </html>
  )
}

export default RootLayout;
