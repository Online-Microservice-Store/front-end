"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context/AuthContext";
import { InvoiceProvider } from "@/context/InvoiceContext";
import React, { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <InvoiceProvider>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            
            {children}
          </ThemeProvider>
          </InvoiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
