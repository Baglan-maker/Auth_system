'use client';

import React from 'react';
import i18n from './lib/i18n';
import { I18nextProvider } from 'react-i18next';
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </body>
      </html>
    );
  }
  