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
} from "@firebase/firestore";

const Home: NextPage = () => {
  const [users, setUsers]: any = useState([]);
  const [applications, setApplications]: any = useState([]);
  const usersCollection = collection(db, "users");
  const applicationsCollection = collection(db, "applications");

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
        <div className={styles.grid}>
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
