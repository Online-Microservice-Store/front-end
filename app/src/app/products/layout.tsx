"use client";
import { styled, Container, Box, default as ThemeProvider } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import { useRouter } from "next/navigation";
import MSidebarClient from "../components/layoutCliente/sidebar/SidebarClient";
import { useAuth } from "@/context/AuthContext";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [token, setTokenUser] = useState("");
  const router = useRouter();
  const { user, getCookieValue } = useAuth();

  useEffect(() => {
    setTokenUser(getCookieValue('token'));
    if (!user) {
        if (global?.window !== undefined) {
            const userData = window?.localStorage?.getItem("user");
            const token = window?.localStorage?.getItem("token");
            const rolss : any= window?.localStorage?.getItem("rols");
            if (userData && token && rolss) {
                // loginUser(JSON.parse(userData), token, rolss);
                router.push("/");
            }
        }
        // Si ya hay sesión, logueo al usuario, sino, lo mando al login
        
    }
  }, []);

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {(() => {
          if (token) {
            return <MSidebarClient
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={() => setMobileSidebarOpen(false)}
            />
          }
        })()}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
