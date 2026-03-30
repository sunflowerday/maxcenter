import type { Metadata, Viewport } from "next"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "MaxCenter",
  description: "AI Product Team Management Platform",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
