import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { FIRESTORE_DB } from "./firebaseConfig";


  export const addToConversation = async (history:string, date:string) => {
    const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
  
    await setDoc(conversationRef, {
      history
    }, { merge: true }); // Ustawienie opcji merge na true, aby stworzyć dokument, jeśli nie istnieje, lub zaktualizować go, jeśli istnieje
  
    console.log('dodano do konwersacji firebase');
  };

  export const getAboutMe = async () => {
    try {
      const heroRef = doc(FIRESTORE_DB, `about me/Mateusz`);
      const heroDoc = await getDoc(heroRef);
      const currentData = heroDoc.data() || {};
      // console.log(typeof currentData);
      return currentData;
    } catch (error) {
      console.error('An error occurred while fetching about me data:', error);
      return {}; // Zwróć pusty obiekt w przypadku błędu
    }
  };