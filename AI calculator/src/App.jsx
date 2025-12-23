import React, { useState } from "react";
import { explainExpression } from "./lib/ai";
const App = () => {
  // User Input( eg: 12+2*90)
  const [expr, setExpr] = useState("");
  //Result
  const [result, setResult] = useState("");
  //Explanation from AI
  const [aiMsg, setAiMsg] = useState("Type an expression and press =");
  //Loading true while waiting for AI Reply
  const [loading, setLoading] = useState(false);

  const handleClick = (value) => {
    setExpr((prev) => prev + value);
    //console.log(expr);
  };
  const handleClear = () => {
    setExpr("");
    setResult("");
    setAiMsg("Type an expression and press =");
  };
  const handleBackspace = () => {
    setExpr((prev) => prev.slice(0, -1));
  };
  const handleAskAI=async()=>{
  
    setLoading(true);
    const text=await explainExpression(expr, result);
    setAiMsg(text);
    setLoading(false);

  }

  const handleEquals = () => {
    try {
      const value = eval(expr);
      setResult(value.toString());
      setAiMsg("Now Click Ask AI for steps!");
    } catch {
      setResult("Error");
    }
  };

  return (
    // #ecadbf,  #5f95d6,  #e9698d, #e6144f, #3f7fce, bcbedc,  #1555a3 from-[#e6144f] to-[#1f71d4]
    <div className="bg-gradient-to-br from-[#4d80b4] to-[#75afe9] min-h-screen">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-white text-lg font-semibold">AI calculator</h1>
          <span className="text-white/70">By Shahnaz</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* bg-white/20   #1f71d4  #e4bd22 #FFFF00 #e6e620 #4c84bc #1f71d4  #dde00b] to-[#28ec38]  from-[#75afe9]/60 to-[#b2c5d8]/60  from-[#75afe9] to-[#b2c5d8]*/}
          <div className="bg-white/20 p-6 backdrop-blur-lg shadow-xl  rounded-3xl">
            <div className="mb-4">
              <div className="text-white/60 text-xs uppercase">Expression</div>
              <div className="text-white text-lg min-h-[40px]">
                {expr || "0"}
              </div>

              <div className="h-px my-3 bg-white/40"></div>

              <div className="text-white/60 text-xs uppercase">Result</div>
              <div className="text-white text-lg min-h-[40px]">
                {result || "0"}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button className="btn" onClick={handleClear}>
                C
              </button>
              <button className="btn" onClick={handleBackspace}>
                B
              </button>
              <button className="btn" onClick={() => handleClick("%")}>
                %
              </button>
              <button className="btn" onClick={() => handleClick("÷")}>
                ÷
              </button>

              <button className="btn" onClick={() => handleClick("7")}>
                7
              </button>
              <button className="btn" onClick={() => handleClick("8")}>
                8
              </button>
              <button className="btn" onClick={() => handleClick("9")}>
                9
              </button>
              <button className="btn" onClick={() => handleClick("*")}>
                x
              </button>

              <button className="btn" onClick={() => handleClick("4")}>
                4
              </button>
              <button className="btn" onClick={() => handleClick("5")}>
                5
              </button>
              <button className="btn" onClick={() => handleClick("6")}>
                6
              </button>
              <button className="btn" onClick={() => handleClick("-")}>
                -
              </button>

              <button className="btn" onClick={() => handleClick("1")}>
                1
              </button>
              <button className="btn" onClick={() => handleClick("2")}>
                2
              </button>
              <button className="btn" onClick={() => handleClick("3")}>
                3
              </button>
              <button className="btn" onClick={() => handleClick("+")}>
                +
              </button>

              <button
                className="btn col-span-2"
                onClick={() => handleClick("0")}
              >
                0
              </button>
              <button className="btn" onClick={() => handleClick(".")}>
                .
              </button>
              <button className="btn" onClick={handleEquals}>
                =
              </button>
            </div>
          </div>
          <div className="bg-white/20 rounded-3xl p-6 shadow-xl relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-white font-semibold">AI Explain</h2>
              <button
                className="btn ai"
                disabled={loading}
                onClick={handleAskAI}
              >
                {loading ? "Thinking..." : "Ask AI"}
              </button>
            </div>
            <p className="ai-text text-[#1555a3] font-bold  min-h-[180px]">{aiMsg} </p>
            <div className="w-full text-center text-white/60 text-sm absolute bottom-5 left-1/2 -translate-x-1/2">
              Privacy: We only send final expression and result when you click
              "Ask AI".
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
