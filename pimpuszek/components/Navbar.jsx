"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContex";

import "./Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="navbar">
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
