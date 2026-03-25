import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/next.theme.provider';
import { Toaster } from '@/components/ui/sonner';
import QueryClientPro from '@/components/providers/query.client.provider';
import { ClerkProvider } from "@clerk/nextjs"
import React from "react";
import { ImageKitProvider } from '@imagekit/next';

export const metadata: Metadata = {
  title: 'EduCRM - Educational Center Management',
  description: 'Modern CRM dashboard for educational centers',
};
const imagekitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClerkProvider signInUrl='/' signInForceRedirectUrl={"/"}>
        <ImageKitProvider urlEndpoint={imagekitEndpoint}>

          <QueryClientPro>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position='bottom-center' />
            </ThemeProvider>
          </QueryClientPro>
        </ImageKitProvider>
        </ClerkProvider>
      </body>
    </html >
  );
}
