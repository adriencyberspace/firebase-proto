import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth, logInWithEmailAndPassword } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div>
          <Link href="/reset">
            <a>Forgot Password</a>
          </Link>
        </div>
        <div>
          Don't have an account?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>{" "}
          now.
        </div>
      </div>
    </div>
  );
};
export default Login;
