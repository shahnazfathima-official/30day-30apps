import { div, p } from "framer-motion/client";
import React from "react";

const ImagePreview = ({ image, error }) => {
  if (error) {
    return <p className="text-rose-600">{error}</p>;
  }

  if (!image) {
    return (
      <div className="h-64 bg-gradient-to-br from-indigo-300 to-pink-300 text-gray-500 border rounded-2xl grid place-items-center mt-10">
        Waiting for your ideas...
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-indigo-300 to-pink-300 border rounded-2xl p-4 shadow-sm mt-10">
      <img
        src={image}
        className="w-full rounded-xl object-cover"
        alt="Generated Tattoo"
      />
    </div>
  );
};

export default ImagePreview;
