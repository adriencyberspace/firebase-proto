//import axios from "axios";
import { db } from "../../firebase/firebase";
import {
  getFirestore as getFirestoreTwo,
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  where,
  collectionGroup,
} from "firebase/firestore";

const fetchUserAccounts = async (user: any) => {
  // let ids = [];
  //const data = await getDocs(collection(db, "users", "kcs85csOEoVkcDYLrHU7"));

  const accountsRef = collection(db, "users");
  //const accountsRef = collectionGroup(db, "proeperties");
  //const userRef = collection(db, "users");
  //  console.log(user.currentUser.uid);

  const accountsQuery = query(
    accountsRef,
    //where("name", "==", "account1"),
    where("readableUids", "array-contains-any", [user.currentUser.uid])
  );

  //const props = db.collectionGroup('properties').get()
  //const accountRef = collection(db, "accounts");
  //const docs = await getDocs(userAccountQuery);
  //const userQuery = doc(db, "users", "kcs85csOEoVkcDYLrHU7");

  /*
   *
   * const docRef = doc.ref;
   const parentCollectionRef = docRef.parent;   // CollectionReference
   const immediateParentDocumentRef = parentCollectionRef.parent;
  */

  const docSnap = await getDocs(accountsQuery);
  //return docSnap;
  const data: any = [];

  docSnap.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return data;

  // const i = Object.keys(ids);
  // console.log(i);

  // const accountsQuery = query(accountRef, where("uid", "in", i));

  // const accounts = await getDocs(accountsQuery);
  // console.log(accounts);

  // accounts.forEach((a) => {
  //   console.log(a.id, a.data());
  // });

  // const d = Object.entries(ids).map((e) => ({ [e[0]]: e[1] }));
};

const fetchOneUserAccount = async (user: any, accountName: string) => {
  const accountsRef = collection(db, "accounts");
  const accountsQuery = query(
    accountsRef,
    where("name", "==", accountName),
    where("readableUids", "array-contains-any", [user.currentUser.uid])
  );

  const docSnap = await getDocs(accountsQuery);
  const data: any = [];
  docSnap.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return data;
};

/*
 *
 * - get accounts attached to a user
 * - total conflicts caught
 * - historical snapshots of a campaign.... hmmm we gotta make a decision about what the home screen actually is...
 * - the home page should probably show
 * - can show a bunch of events
 */

export { fetchUserAccounts, fetchOneUserAccount };
