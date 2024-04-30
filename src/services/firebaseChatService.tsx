import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { FIREBASE_STORAGE, FIRESTORE_DB } from "./firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";


  export const addToConversation = async (userIp:string, history:string, date:string, usedTokens:string) => {
    const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
  
    await setDoc(conversationRef, {
      [userIp]: [{usedTokens:usedTokens}, {history: history}]
    }, { merge: true });
  
    console.log('dodano do konwersacji firebase');
  };
  export const sumUsedTokensFromDate = async (date: string): Promise<number> => {
    const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
    const docSnapshot = await getDoc(conversationRef);
  
    let totalUsedTokens = 0;
  
    if (docSnapshot.exists()) {
      const conversationData = docSnapshot.data();
      const userData = Object.values(conversationData)[0] || [];
  
      userData.forEach((user: any) => {
        totalUsedTokens += user.usedTokens || 0;
      });
    }
    console.log('total used tokens: ' + totalUsedTokens);
    return totalUsedTokens;
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

  // export const getImage = async (folder: string) => {
  //   try {
  //     const storageRef = ref(FIREBASE_STORAGE, `${folder}`);
  //     listAll(storageRef).then((result) => {
  //       result.items.forEach((itemRef) => {
  //         getDownloadURL(itemRef).then((url) => {
  //           console.log(itemRef.name,' URL do pobrania pliku:', url);
  //         }).catch((error) => {
  //           console.error('Błąd podczas pobierania URL:', error);
  //         });
  //       });
  //     }).catch((error) => {
  //       console.error('Błąd podczas pobierania listy plików:', error);
  //     });
  //   } catch (error) {
  //     console.error("Błąd podczas pobierania danych:", error);
  //   }
  // }


export const getImage = async (folder: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}`);
    const result = await listAll(storageRef);
    const imageUrls = await Promise.all(result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { [itemRef.name]: url };
    }));
    return imageUrls;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return []; // Zwracanie pustej tablicy w przypadku błędu
  }
}