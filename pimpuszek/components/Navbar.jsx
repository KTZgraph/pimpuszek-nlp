"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContex";
// import { useSession, signIn, signOut } from "next-auth/react";

import "./Navbar.scss";

const Navbar = () => {
  // const { status } = useSession();
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="navbar">
      <Link href="/lessons">lessons link</Link>
      {/* {status === "authenticated" && (
        // <button onClick={() => signOut()}>Wyloguj</button>
        <Link href="/logout">wyloguj</Link>
      )}
      {status === "unauthenticated" && (
        // <button onClick={() => signIn()}>Zaloguj się</button>
        // <button onClick={() => signIn()}>Zaloguj się</button>
        <Link href="/login">zaloguj</Link>
      )} */}

      {user ? (
        <button
          onClick={async () => {
            await logout();
            router.push("/login");
          }}
        >
          wyloguj
        </button>
      ) : (
        <Link href="/login">zaloguj</Link>
      )}
    </div>
  );
};

export default Navbar;
