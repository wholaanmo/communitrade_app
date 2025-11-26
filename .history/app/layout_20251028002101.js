import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'CommuniTrade - Community-Based Trading',
  description: 'Your platform for community-based trading and sharing of skills and services without using money.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
