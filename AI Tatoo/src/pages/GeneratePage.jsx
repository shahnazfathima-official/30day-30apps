import React, { useState } from "react";
import IdeaForm from "../components/IdeaForm";
import InkLoader from "../components/InkLoader";
import ImagePreview from "../components/ImagePreview";
import { main } from "framer-motion/client";

const GeneratePage = () => {
  // const [image, setImage]= useState("https://plus.unsplash.com/premium_photo-1696838770987-aa5cc609f57b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (prompt) => {
    try {
      setLoading(true);
      setError("");
      setImage(null);

      //OpenRouter Call

      const resp = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY_5}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AI Tattoo Generator",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // model: "google/gemini-2.5-flash-image",
            model: "openai/gpt-oss-20b:free",
            messages: [
              {
                role: "user",
                content: `Create a unique tattoo design based on this idea: "${prompt}".
        The tattoo style must be clean , high-contrast and suitable for body ink.
        Prefer black and white with detailed line art and shading. Avoid text and backgounds`,
              },
            ],
            modalities: ["image", "text"],
          }),
        }
      );
      const text = await resp.text();

      if (!text) throw new Error("Empty response from model");

      const data = JSON.parse(text);
      const msg= data?.choices?.[0]?.message;
      const imgUrl= msg?.images?.[0]?.image_url?.url;

      if(!imgUrl) throw new Error("No image returned by the model");
      setImage(imgUrl);
    //   console.log(imgUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Check API key/model and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <IdeaForm onGenerate={handleGenerate} />

      <div className="mt-8">
        {loading ? (
          <InkLoader label="Drawing your  tattoo..." />
        ) : (
          <ImagePreview image={image} error={error} />
        )}
      </div>
    </main>
  );
};

export default GeneratePage;
