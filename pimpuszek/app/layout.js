"use client";

// https://beta.nextjs.org/docs/api-reference/use-pathname
import { usePathname } from "next/navigation";

import Providers from "./providers";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
const noAuthRequiredPageList = ["/login", "/signup"];

// tu trzeba zimportować style
import "../styles/globals.css";
import "./layout.scss";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html>
      <head />
      <body>
        <Providers>
          <Navbar />
          <main className="layout__main">
            {noAuthRequiredPageList.includes(pathname) ? (
              children
            ) : (
              // sprawdzm logowanie dopiero gdy jest to potrzebne
              <ProtectedRoute>{children}</ProtectedRoute>
            )}
          </main>
        </Providers>
      </body>
    </html>
  );
}
