import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { FIRESTORE_DB } from "./firebaseConfig";
import { getDate } from "../utils/getDate";


  export const addToConversation = async (history:string) => {
    const date = getDate()
    const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
  
    await setDoc(conversationRef, {
      history
    }, { merge: true }); // Ustawienie opcji merge na true, aby stworzyć dokument, jeśli nie istnieje, lub zaktualizować go, jeśli istnieje
  
    console.log('dodano do konwersacji firebase');
  };

  export const getAboutMe = async () => {
    const heroRef = doc(FIRESTORE_DB, `about me/Mateusz`);
    const heroDoc = await getDoc(heroRef);
    const currentData = heroDoc.data() || [];
    return currentData;
  };