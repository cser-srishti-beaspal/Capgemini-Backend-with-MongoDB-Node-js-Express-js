const express = require('express');
const app = express();

app.get("/",
    (req,res)=>{
        res.send("message received")
    }
)

app.get("/html",
    (req,res)=>{
        res.send("<h1>hi there</h1>")
    }
)

app.get("/json",
    (req,res)=>{
        res.json({
            "message":"Backend Json response"
        })
    }
)

app.get("/array",
    (req,res)=>{
        res.send([10,20,30])
    }
)


app.listen(3000,(err)=>{
    if (err) throw err
    console.log("Sever running at http://localhost:3000")
})
app.listen(3000)