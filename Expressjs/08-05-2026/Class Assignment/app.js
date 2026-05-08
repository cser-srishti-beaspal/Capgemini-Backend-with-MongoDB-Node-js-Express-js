const express = require('express');
// const mongodb = require('mongodb').MongoClient;
// const path = require('path');
const app = express();

app.get("/users", (req, res) => {
    res.json({ message: "Get all users" });
});

app.post("/users", (req, res) => {
    res.json({ message: "User created" });
});

app.use((req, res) => {

    // Check method is NOT one of the supported ones
    if (
        req.method !== "GET" &&
        req.method !== "POST" &&
        req.method !== "PUT" &&
        req.method !== "PATCH" &&
        req.method !== "DELETE"
    ) {
        return res.status(405).json({
            status: "error",
            message: `Method ${req.method} Not Allowed`
        });
    }

    // method is valid n route not found
    return res.status(404).json({
        status: "error",
        message: "Route Not Found"
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});