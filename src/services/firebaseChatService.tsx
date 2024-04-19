import {
    collection,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { FIRESTORE_DB } from "./firebaseConfig";


  export const addToConversation = async (id: string, lp: number, question: string, answer: string) => {
    const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), id);
  
    await setDoc(conversationRef, {
      [lp]: [question, answer]
    }, { merge: true }); // Ustawienie opcji merge na true, aby stworzyć dokument, jeśli nie istnieje, lub zaktualizować go, jeśli istnieje
  
    console.log('done');
  };