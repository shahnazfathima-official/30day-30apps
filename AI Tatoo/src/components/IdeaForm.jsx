import React, { useState } from "react";
import { Send } from "lucide-react";

const IdeaForm = ({onGenerate}) => {
    const [val,setVal]= useState("");

    const submit=(e)=>{
        e.preventDefault();
        console.log("j");

        const idea=val.trim();
        if(!idea) return;
        console.log(idea);
        onGenerate(idea);
    }

  return (

    

    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
      <input
        type="text"
        value={val}
        onChange={(e)=> setVal(e.target.value)}
        placeholder="Minimalist phoenix with geometric wings"
        className="border border-white rounded-xl px-4 py-3 flex-1 "
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2
        bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl 
        font-semibold shadow-sm"
      >
        <Send className="w-4 h-4"/>
        Generate
      </button>
    </form>
  );
};

export default IdeaForm;
