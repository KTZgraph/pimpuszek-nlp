"use client";

import { NextPage } from "next";
import React from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <form>
        <h2>Login</h2>
        <input type="email" placeholder="john@email.com" />
        <input type="password" placeholder="********" />
        <input type="submit" value="login" />
        <button onClick={signIn}>Login</button>
      </form>
    </div>
  );
};

export default SignIn;
