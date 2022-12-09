"use client";

import { SessionProvider } from "next-auth/react";

// BUG - tu trzeba providerów
// https://youtu.be/ZmpO65DhRN0?t=888
import { AuthContextProvider } from "../context/AuthContex";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}
