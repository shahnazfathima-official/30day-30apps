export const getAiMoveFromOpenRouter = async (board)=>{

    console.log(import.meta.VITE_OPENROUTER_API_KEY);

    const systemPrompt= `
    You are a smart Tic Tac Toe AI playing as "O".

    Your goal:
    1. Win if possible
    2. Block the opponent if they are about to win
    3. Otherwise: Choose center > corner > side

    Only return ONE number (0-8). Do not explain.
    `
    const userPrompt = `
    Current board: ${JSON.stringify(board)}
    
    Each cell is indexed like this:
    [0][1][2]
    [3][4][5]
    [6][7][8]

    "O" = you (AI)
    "X" = human
    null = empty

    What is your move?
    `

const getMoveFromDeepseek = async()=>{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
        method: "POST",
        headers:{
             //Authorization: `Bearer ${import.meta.VITE_OPENROUTER_API_KEY}`,
            // Authorization: `Bearer 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`,
            Authorization: `Bearer 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`,

            "Content-Type":"application/json"
        },
        body:JSON.stringify({
           model: "deepseek/deepseek-r1-0528",
            //model: "anthropic/claude-3-haiku--",
            temperature: 0.2,
            messages:[
                {role:"system", content:systemPrompt},
                {role:"user", content:userPrompt},
            ]
        })
    });
    console.log(response);
    const data= await response.json();
    console.log(data);
    const text= data.choices?.[0]?.message?.content?.trim();
    console.log(text);
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10): null;
}
    try{
        let move= await getMoveFromDeepseek();
        return move;
    }catch(err){
        console.log("AI",err);

        const preferredOrder = [4,0,2,6,8,1,3,5,7];

        return preferredOrder.find(i=> board[i]=== null?? null);
    }
};



