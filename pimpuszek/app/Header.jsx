"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { status } = useSession();
  return (
    <div>
      <Link href="/lessons">lessons link</Link>
      {status === "authenticated" && (
        <button onClick={() => signOut()}>Wyloguj</button>
      )}
      {status === "unauthenticated" && (
        <button onClick={() => signIn()}>Zaloguj się</button>
      )}
      <hr />
    </div>
  );
};

export default Header;
