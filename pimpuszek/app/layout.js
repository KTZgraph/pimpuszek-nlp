"use client";

import { useRouter } from "next/navigation";

import Providers from "./providers";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
const noAuthRequired = ["/login", "/signup"];

// tu trzeba zimportować style
import "../styles/globals.css";
import "./layout.scss";

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html>
      <head />
      <body>
        <Providers>
          <Navbar />
          <main className="layout__main">
            {noAuthRequired.includes(router.pathname) ? (
              { children }
            ) : (
              <ProtectedRoute>{children}</ProtectedRoute>
            )}
          </main>
        </Providers>
      </body>
    </html>
  );
}
