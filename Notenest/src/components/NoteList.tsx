import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import {collection, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import toast from 'react-hot-toast';
// import { snapshot } from 'node:test';

interface Note {
    id:string,
    content:string,
       
}

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
            const notesData = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            })) as Note[];
            setNotes(notesData);
        })
        return() => unsubscribe();
    },[]);

    const deleteNote = async (id: string) => {
        await deleteDoc(doc(db, "notes", id));
        toast.success("Note deleted");
    }
    
    if(notes.length === 0){
        return <p className='text-center text-gray-400 mt-4'> No notes yet. Start typing!</p>
    }
	return (
        <div className={`grid gap-4 mt-4 ${notes.length ===1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
            {notes.map((note) => (
                <div className='p-5 border-gray-200 rounded-xl shadow-md bg-white 
                hover:shadow-lg transition-all duration-200 flex items-center justify-between'>
                    <p className='text-base text-gray-800'>{note.content}</p>
                    
                        <Button variant="destructive" onClick={() => deleteNote(note.id)}>
                            Delete
                        </Button>
                    
                </div>
            ))}
        </div>
    )
}

export default NoteList
