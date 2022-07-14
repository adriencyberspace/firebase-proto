import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { db } from "../firebase/firebase";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  addDoc,
} from "@firebase/firestore";

const Home: NextPage = () => {
  const [users, setUsers]: any = useState([]);
  const [applications, setApplications]: any = useState([]);
  const usersCollection = collection(db, "users");
  const applicationsCollection = collection(db, "applications");

  const [newName, setNewName] = useState("");
  const [newApplicant, setNewApplicant] = useState("");
  const [newId, setNewId] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPrefProgram, setNewPrefProgram] = useState("");

  const createUser = async () => {
    await addDoc(usersCollection, { name: newName });
  };

  const createApplication = async () => {
    await addDoc(applicationsCollection, {
      name: newApplicant,
      userId: newId,
      address: newAddress,
      preferredProgram: newPrefProgram,
      status: "Pending",
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getApplications = async () => {
      const data = await getDocs(applicationsCollection);
      setApplications(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    getApplications();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CROP Protoype App</title>
        <meta
          name="description"
          content="Nextjs Typescript Firebase Prototype"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Users</h1>
        <div>
          {users.map((user: any) => {
            return (
              <div>
                {user.name}: {user.id}
              </div>
            );
          })}
        </div>
        <h1 className={styles.title}>Applications</h1>
        <div className={styles.grid}>
          {applications.map((application: any) => {
            return (
              <div>
                <div>Applicant: {application.name}</div>
                <div>ID: {application.userId}</div>
                <div>Address: {application.address}</div>
                <div>Preferred Program: {application.preferredProgram}</div>
                <div>Application Status: {application.status}</div>
              </div>
            );
          })}
        </div>
        <div>
          <h1>Create New User</h1>
          <input
            placeholder="Name"
            onChange={(e) => setNewName(e.target.value)}
          />
          {/* <input placeholder="ID" onChange={(e) => setNewId(e.target.value)} /> */}
          <button onClick={createUser}>Create User</button>
        </div>
        <div>
          <h1>Submit New Application</h1>
          <input
            placeholder="Name"
            onChange={(e) => setNewApplicant(e.target.value)}
          />
          <input placeholder="ID" onChange={(e) => setNewId(e.target.value)} />
          <input
            placeholder="Address"
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <input
            placeholder="PrefProgram"
            onChange={(e) => setNewPrefProgram(e.target.value)}
          />
          <button onClick={createApplication}>Submit Application</button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          Users
        </a>
      </footer>
    </div>
  );
};
export default Home;
