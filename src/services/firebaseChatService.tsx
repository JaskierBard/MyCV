import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_STORAGE, FIRESTORE_DB } from "./firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const addToConversation = async (
  userIp: string,
  history: string,
  date: string,
  usedTokens: string
) => {
  const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);

  await setDoc(
    conversationRef,
    {
      [userIp]: [{ usedTokens: usedTokens }, { history: history }],
    },
    { merge: true }
  );
};
export const sumUsedTokensFromDate = async (date: string): Promise<number> => {
  const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
  const docSnapshot = await getDoc(conversationRef);

  let totalUsedTokens = 0;

  if (docSnapshot.exists()) {
    const conversationData = docSnapshot.data();
    const userDataValues = Object.values(conversationData);

    userDataValues.forEach((userData: any) => {
      userData.forEach((user: any) => {
        totalUsedTokens += user.usedTokens || 0;
      });
    });
  }

  return totalUsedTokens;
};

export const checkUserByDateAndIp = async (
  date: string,
  userIp: string
): Promise<any[] | null> => {
  const conversationRef = doc(collection(FIRESTORE_DB, "conversation"), date);
  const docSnapshot = await getDoc(conversationRef);

  if (docSnapshot.exists()) {
    const conversationData = docSnapshot.data();
    const userData = conversationData[userIp];
    return userData;
  } else {
    return null;
  }
};

export const getSettings = async (
  name: string,
  setting: string
): Promise<string> => {
  const conversationRef = doc(collection(FIRESTORE_DB, "settings"), setting);
  const docSnapshot = await getDoc(conversationRef);

  try {
    const prompt = docSnapshot.data()?.[name];
    return prompt;
  } catch (error) {
    return "Nie udało się załadować prompta, poproś o przeładowanie strony";
  }
};

export const getAboutMe = async () => {
  try {
    const heroRef = doc(FIRESTORE_DB, `about me/Mateusz`);
    const heroDoc = await getDoc(heroRef);
    const currentData = heroDoc.data() || {};
    return currentData;
  } catch (error) {
    console.error("An error occurred while fetching about me data:", error);
    return {};
  }
};

export const getShort = async () => {
  try {
    const heroRef = doc(FIRESTORE_DB, `about me/MateuszShort`);
    const heroDoc = await getDoc(heroRef);
    const currentData = heroDoc.data() || {};
    return currentData;
  } catch (error) {
    console.error("An error occurred while fetching about me data:", error);
    return {};
  }
};

export const getImage = async (folder: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}`);
    const result = await listAll(storageRef);

    const imageUrls: Record<string, string> = {};

    await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        imageUrls[itemRef.name] = url;
      })
    );

    return imageUrls;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return {};
  }
};
export const downloadCV = async () => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `CV/mateusz_cv.pdf`);
    const url = await getDownloadURL(storageRef);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mateusz_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading CV:", error);
  }
};
