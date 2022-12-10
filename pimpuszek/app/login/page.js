"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// https://youtu.be/ZmpO65DhRN0?t=1367
import { useAuth } from "../../context/AuthContex";

const Login = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await login(data.email, data.password);
      if (user) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
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
      <label htmlFor="userPassword">Password</label>
      <input
        id="userPassword"
        name="userPassword"
        type="password"
        value={data.password}
        onChange={(e) =>
          setData((prevState) => ({ ...prevState, password: e.target.value }))
        }
      />
      <button type="submit" onClick={handleClick}>
        Zaloguj się
      </button>
    </div>
  );
};

export default Login;
