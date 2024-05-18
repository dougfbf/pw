import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ToastContainer from '@/hooks/useToast/ToastContainer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `FreeDDoS`,
  applicationName: 'FreeDDoS',
  authors: [{ name: 'serverdown.cc' }],
  description: `FreeDDoS.pw is a free, easy-to-use IP stresser/booter that doesn't require registration. Feel free to start using our panel!`,
  keywords: `free stresser, free booter, free ip booter, stresser, booter, top stresser, best stresser, best booter, ddos, ip stresser, ip booter`,
  openGraph: {
    type: `website`,
    title: `FreeDDoS`,
    url: 'https://freeddos.pw',
    description: `FreeDDoS.pw is a free, easy-to-use IP stresser/booter that doesn't require registration. Feel free to start using our panel!`,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
