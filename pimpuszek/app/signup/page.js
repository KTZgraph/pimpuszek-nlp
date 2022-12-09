"use client";

import { useState } from "react";
// https://youtu.be/ZmpO65DhRN0?t=913
import { useAuth } from "../../context/AuthContex";

const Signup = () => {
  const { user, signup } = useAuth();
  console.log(user);

  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
    passwordConfim: "password",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
    } catch (err) {
      console.error(err);
    }
    console.log(data);
  };

  return (
    <div className="signup">
      <label htmlFor="userEmail">Email</label>
      <input
        id="userEmail"
        name="userEmail"
        type="email"
        value={data.email}
        onChange={(e) =>
          setData((prevState) => ({ ...prevState, email: e.target.value }))
        }
      />
      <label htmlFor="userPassword">Hasło</label>
      <input
        id="userPassword"
        name="userPassword"
        type="password"
        value={data.password}
        onChange={(e) =>
          setData((prevState) => ({ ...prevState, password: e.target.value }))
        }
      />
      <label htmlFor="userPasswordConfirm">Powtórz Hasło</label>
      <input
        id="userPasswordConfirm"
        name="userPasswordConfirm"
        type="userPasswordConfirm"
        value={data.passwordConfim}
        onChange={(e) =>
          setData((prevState) => ({
            ...prevState,
            passwordConfim: e.target.value,
          }))
        }
      />
      <button onClick={(e) => handleClick(e)} type="submit">
        Zarejestruj się
      </button>
    </div>
  );
};

export default Signup;
