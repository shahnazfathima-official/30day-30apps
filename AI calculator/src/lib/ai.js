export async function explainExpression(expr, result) {

    console.log(expr, result);
    if(!expr || !result){
        return "Type something (E.g: 3+2), press =, the click ask AI";
    }
    const key= "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";
    if(!key){
        return "Missing API Key";
    }
    const systemPrompt= "You are a kind math tutor for absolute beginners. Explain like a 10-year-old kid. Explain like a story using cartoons."+
    "Use 3-7 short bullet steps and also add emoji to make it attractive to read. Prefer everyday words. Do not envent new numbers."+
    "Explain the order of operations if relevant. End with a one line recap.";

    const userPrompt= `Expression: ${expr}\n`+
    `Result: ${result}\n`+
    `Explain simply, in steps, without extra symbols.`;

    const body= {
       // model: "google/gemini-flash-1.5",
       model: "openai/gpt-3.5-turbo-0613",
        messages: [
          {
              role:'system',
            content: systemPrompt,
          },
          {
            role:'user',
            content: userPrompt,
          }
        ]
    }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if(!res.ok){
    return "AI request failed, check your key, model or network";

  }

    const data=await res.json();
    const text= data?.choices?.[0]?.message?.content?.trim();
    return text|| "AI did not return any text";
  } catch (err) {
   return "Could not reach AI service. Please try again." 
  }
}
