import express, { text } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app= express();
const PORT=process.env.PORT||5000;

app.use(cors({
     origin:'http://localhost:5173'
}));
app.use(express.json());

const quoteSchema= new mongoose.Schema({
    text:{
        type: String,
        required:true,
        trim:true,
        minlength:1
    }
},{timestamps:true});

const Quote = mongoose.model("Quote", quoteSchema);



app.get("/",(req, res)=>{
    res.send("Hello this is mongodb backend");
});

app.get("/api/quotes", async(req,res)=>{
    try{
        const quotes= await Quote.find().sort({createdAt:-1});
        res.json(quotes);

    }catch(err){
        res.status(500).json({error:"Failed to fetch"});
    }
})

//Post new quote

app.post("/api/quotes", async(req,res)=>{
    try{
        const {text}= req.body;
        if(!text || !text.trim()){
            return res.status(400).json({error:"Text is required"});
        }
        const created= await Quote.create({text:text.trim()})
        res.status(201).json(created);


    }catch(err){
        res.status(500).json({error:"Failed to create quote"});
    }
})
app.put("/api/quotes/:id", async(req,res)=>{
    try{

        console.log(req.params);
        const {id}= req.params;
        const {text}= req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid quote ID"});
        }

        if(!text || !text.trim()){
            return res.status(400).json({error:"Text is required"});
        }
        const updated=  await Quote.findByIdAndUpdate(id,
            {text: text.trim()});
        
        if(!updated) return res.status(404).json({error:"Quote not found"})

        res.json(updated);

    }catch(err){
        res.status(500).json({error:"Failed to create quote"});
    }
})

app.delete("/api/quotes/:id", async(req,res)=>{
    try{

        console.log(req.params);
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid quote ID"});
        }

        const deleted = await Quote.findByIdAndDelete(id);
        
        if(!deleted) return res.status(404).json({error:"Quote not found"})

        res.status(204).end();

    }catch(err){
        res.status(500).json({error:"Failed to delete quote"});
    }
})

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err)=>{
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
});
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})