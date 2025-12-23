import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("AI SaaS");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        //model:"anthropic/claude-haiku-4.5",
        messages: [
          {
            role: "user",
            content: `You are an expert web content designer. 
                Create a clean, modern, and responsive HTML landing page for a ${category} product named "${idea}". 
                The product "${idea}" is an innovative solution in the ${category.toLowerCase()} domain. 
                Describe the features in a way that clearly communicates the product's value. 

                The page must include:
                - A bold main heading with the product name.
                - A short and catchy subheading that explains what the product does.
                - Three unique feature cards — each with a short title and a relevant description about "${idea}" (avoid generic lorem ipsum).
                - A centered "Get Started" button as the main call to action.

                Use plain HTML and Tailwind CSS classes. 
                Return only valid HTML — no markdown, no code block formatting.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173/",
        },
      }
    );
    // console.log(response.data.choices[0].message.content);
    setResult(response.data.choices[0].message.content);
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to Clipboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-300 px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
          AI Landing Page Generator
        </h1>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your product idea (e.g: Travel, Shopping)"
          className="w-full p-3 border-gray-300 border rounded-lg mb-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border-gray-300 border rounded-lg mb-4"
        >
          <option value="AI SaaS">AI SaaS</option>
          <option value="Productivity Tool">Productivity Tool</option>
          <option value="Statup">Statup</option>
        </select>

        <button
          className="w-full text-white font-bold bg-pink-700 py-3 rounded-lg hover:bg-pink-800"
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate Landing Page"}
        </button>
        {result && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">Live Preview</h2>
            <div
              className="border p-5 rounded-lg mb-2"
              dangerouslySetInnerHTML={{ __html: result }}
            />
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">HTML Code:</h3>
              <button
                className="px-4  text-white font-bold bg-gray-700 py-3 rounded-lg hover:bg-gray-800"
                onClick={copyCode}
              >
                Copy Code
              </button>
              <pre className="mt-6 bg-black text-white p-4 text-sm rounded-lg overflow-x-auto">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
