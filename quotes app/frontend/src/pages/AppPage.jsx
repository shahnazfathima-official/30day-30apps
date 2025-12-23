import React, { useEffect, useState } from 'react'
import { Pencil, Trash2, Save, XCircle } from "lucide-react"
import axios from "axios";

const AppPage = () => {


    const [text, setText] = useState("");
    const [quotes, setQuotes] = useState([
        { _id: "1", text: "Be yourself; everyone else is already taken." },
        { _id: "2", text: "Life is what happens when you're busy making other plans." }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const getQuotes = async () => {
        const res = await axios.get("http://localhost:4000/api/quotes");
        console.log(res.data);
        setQuotes(res.data)
    }

    const handleAdd = async () => {
        if (!text.trim()) {
            alert("Please fill the text");
        } else {
            await axios.post("http://localhost:4000/api/quotes", { text });
            getQuotes();
            setText('');
        }
    }



    const startEdit = (id, text) => {

        setEditingId(id);
        setEditingText(text);
    }

    const handleDelete = async (id) => {

        if (confirm("Are you sure you want to delete?")) {
            await axios.delete(`http://localhost:4000/api/quotes/${id}`);
            getQuotes();
        }
    }

    const handleUpdate = async() => {
       if(!editingText.trim()){
        alert("Please fill the quotes to edit");
           }else{
await axios.put(`http://localhost:4000/api/quotes/${editingId}`,{text:editingText});
setEditingId(null);
setEditingText("");
getQuotes();
           }
    }
    const handleCancel = () => {
        setEditingId(null);
        setEditingText("");
    }



    useEffect(() => {
        getQuotes();
    }, []);

    // bg-[#ffde03]

    return (
        <div className='min-h-screen bg-gradient-to-br from-yellow-300 to-blue-300 py-12 px-4 md:px-10'>
            <h1 className='text-4xl font-bold text-center mb-10 text-[#000000]'>
                📝 My Quotes App
            </h1>
            {/* Create Form */}
            <div className='max-w-xl mx-auto flex gap-4 mb-10'>
                <input type="text"
                    placeholder='Type your quotes...'
                    className='w-full px-4 py-2 rounded-md border border-gray-700 shadow-sm'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />

                <button className='bg-[#ff0266] text-white px-6 py-2 rounded-md hover:bg-[#ee5994]'
                    onClick={handleAdd}>
                    Add
                </button>
            </div>
            {/* Quotes List */}
            <div className='max-w-xl mx-auto space-y-4'>
                {quotes.map((q) => (
                    <div key={q._id} className='bg-white shadow-md rounded-lg p-4 flex-col' >
                        {editingId === q._id ? (
                            <div className='flex gap-2'>
                                <input type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className='w-full px-3 py-2 border rounded-md' />
                                <div className='flex gap-2'>
                                    <button className='bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-1'
                                        onClick={handleUpdate}>Save</button>
                                    <button className='bg-gray-500 text-white px-3 py-2 rounded-md flex items-center gap-1'
                                        onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>

                        ) : (
                            <div className='flex justify-between w-full items-center'>
                                <p>{q.text}</p>
                                <div className='flex gap-4'>
                                    <button className='text-blue-600 hover:text-blue-800 flex items-center gap-1' onClick={() => startEdit(q._id, q.text)}>
                                        <Pencil size={16} /> Edit
                                    </button>
                                    <button className='text-red-600 hover:text-red-800 flex items-center gap-1' onClick={() => handleDelete(q._id)}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppPage