import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db, logout } from "../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Header() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect((): any => {
    if (loading) return;
    if (!user) return router.push("/login");
    fetchUserName();
  }, [user, loading]);

  const handleLogout = () => {
    router.push("/login");
    logout();
  };
  return (
    <div className="header">
      {user ? (
        <div>
          Hello {name}, {user?.email}
          <div>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <a href="/login">Log in to your account</a>
        </div>
      )}
    </div>
  );
}
