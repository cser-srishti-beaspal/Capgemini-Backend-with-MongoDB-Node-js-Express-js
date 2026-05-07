const express = require('express');
const mongodb = require('mongodb').MongoClient;
const path = require('path');
const app = express();
//mongodb://127.0.0.1:27017
//mongodb://localhost:27017
let db;
let url = "mongodb://localhost:27017"

let connectdb = async()=>{
    let client = await mongodb.connect(url);
    db = await client.db("JECRC");
    //console.log(db);
    console.log("JECRC DB IS CONNECTED SUCCESSFULLY");
    await db.createCollection("users") ;
    console.log("users collection created");
}
connectdb();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Express with mongodb intergration </h1>")
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"register.html"))
})

//send file
app.post("/register",async(req,res)=>{
    console.log(req.body);
    await db.collection("users").insertOne(req.body);
    res.status(200).send("<h1>data received and stored in mongodb</h1>")
    // res.status(200).json(req.body)
});

app.put("/register/:name", async (req, res) => {
    const { name } = req.params;            
    const { Email, City, PhoneNumber } = req.body;   
    const result = await db.collection("users").updateOne(
        { name: name },
        {
            $set: {
                Email,
                City,
                PhoneNumber
            }
        }
    );
    res.json({
        message: "User fully updated",
        result
    });
});

app.patch("/register/email/:Email", async (req, res) => {
    const { Email } = req.params;
    const updates = req.body;
    const result = await db.collection("users").updateOne(
        { Email },          
        { $set: updates }
    );
    res.json({
        message: "User updated using email",
        result
    });
});

app.delete("/register/email/:Email", async (req, res) => {
    const { Email } = req.params;
    const result = await db.collection("users").deleteOne({ Email });
    res.json({
        message:"User deleted using email",
        result
    });
});


app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
});