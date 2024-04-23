import { getAboutMe, getImage } from "../services/firebaseChatService";

enum CallableFunctions {
  GetInformation = "getInformations",
  AnswerWithInformations = "answerWithInformations",
  GetPictures = "getPictures",

}

const answerTextAnalysis = async (data: any) => {
  const dataa = await getAboutMe();
  const choice = data["informations"];
  console.log("data ", dataa[choice]);
  return dataa[choice];
};

const getPictures = async (name: any) => {
  const dataa = await getImage("projects");
  console.log("data ", dataa)
  return dataa;
};

const answer = async (data: any) => {
  console.log("Druga odpowiedź");
  return "Okej.";
};

export const handleCalledFunction = async (call: any): Promise<string> => {
  try {
    switch (call.name as CallableFunctions) {
      case CallableFunctions.GetInformation:
        console.log("GetInformation");
        return await answerTextAnalysis(JSON.parse(call.arguments));
      case CallableFunctions.GetPictures:
        console.log("GetPictures");
        const data = await getPictures(JSON.parse(call.arguments))
        console.log(data)
        return JSON.stringify(data);
      case CallableFunctions.AnswerWithInformations:
        console.log("AnswerWithInformations");
        return await answer(call.arguments);

      default:
        throw new Error("Unknown function name.");
    }
  } catch (e) {
    return (e as Error).message;
  }
};
