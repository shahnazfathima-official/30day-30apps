import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [colors, setColors] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // const str= "Color : 00ff00, E94F65 and abc123";

  // const matches= str.match(/[A-Za-z0-9]{6}/g);

  // console.log(matches);

  const handleGenerate = async () => {
    setLoading(true);
    setColors([]);
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "user", content: `Give me 5 hex colors for ${prompt}` },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
        }
      );
      const resultText = response.data.choices[0].message.content;
      const hexMatches = resultText.match(/#[A-Za-z0-9]{6}/g);
      console.log(hexMatches);

      if (hexMatches) setColors(hexMatches);
      else setColors(["#f87171", "#34D399", "#60A5FA"]); //Default colors
    } catch (error) {
      console.log("Error:", error);
    } finally {
       setLoading(false);
       setPrompt("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-700 to-[#0f0c42] min-h-screen text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-5xl font-bold font-serif  mb-4 text-center">
        AI Color Palette
      </h1>
      <input
        type="text"
        className="w-full border max-w-md p-5 rounded-xl bg-gradient-to-r from-blue-950 to-green-950 text-white mb-4 "
        placeholder="Enter your brand / mood (e.g: Sun, Moon)"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <button
        className="bg-green-600 text-white text-xl px-6 py-2 rounded hover:bg-green-700"
        disabled={loading}
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "Generate Palette"}
      </button>

      {colors.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-10">
          {colors.map((color, idx) => (
            <div key={idx} className=" flex flex-col items-center">
              <div
                className="w-20 h-20 rounded shadow-lg"
                style={{ backgroundColor: color }}
              />
              <span className="mt-3">{color}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
