export const countPriceUsd = (usage: any, model: string) => {
    let pricePerPromptToken = 0;
    let pricePerCompletionToken = 0;
  
    switch (model) {
      case "gpt-4-1106-preview":
        pricePerPromptToken = 0.01;
        pricePerCompletionToken = 0.03;
        break;
      case "gpt-4-turbo-2024-04-09":
        pricePerPromptToken = 0.001;
        pricePerCompletionToken = 0.03;
        break;
      case "gpt-4-32k":
        pricePerPromptToken = 0.06;
        pricePerCompletionToken = 0.12;
        break;
      case "gpt-3.5-turbo-0125":
        pricePerPromptToken = 0.0005;
        pricePerCompletionToken = 0.0015;
        break;
      default:
        console.log("Unknown model");
        break;
    }
  
    const input = (usage.prompt_tokens / 1000) * pricePerPromptToken;
    const output = (usage.completion_tokens / 1000) * pricePerCompletionToken;
    console.log(`prompt wejściowy: ${input}$, rezultat: ${output}$`)
    const result = {input:input, output:output}
    return result;
  };
  // użycie, zamiast pierwszego stringa dać completion.usage:



export const userLimits = async () => {
    
}