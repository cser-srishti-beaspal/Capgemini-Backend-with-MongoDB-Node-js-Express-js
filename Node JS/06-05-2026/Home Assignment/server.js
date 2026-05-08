const http = require("http");
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let collection;

// Connect to MongoDB
async function connectDB() {
    await client.connect();
    const db = client.db("nodeAssessment");
    collection = db.collection("students");
    console.log("MongoDB Connected");
}
connectDB();

function getRequestData(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => resolve(JSON.parse(body)));
        req.on("error", err => reject(err));
    });
}

const server = http.createServer(async (req, res) => {

    res.setHeader("Content-Type", "application/json");

    // GET → Fetch all students
    if (req.method === "GET" && req.url === "/students") {
        const data = await collection.find().toArray();
        res.end(JSON.stringify(data));
    }

    // POST → Insert student
    else if (req.method === "POST" && req.url === "/students") {
        const body = await getRequestData(req);
        const result = await collection.insertOne(body);
        res.end(JSON.stringify({ message: "Student Added", result }));
    }

    // PUT → Update full document
    else if (req.method === "PUT" && req.url.startsWith("/students/")) {
        const id = req.url.split("/")[2];
        const body = await getRequestData(req);

        const result = await collection.replaceOne(
            { _id: new ObjectId(id) },
            body
        );

        res.end(JSON.stringify({ message: "Student Replaced", result }));
    }

    // PATCH → Update partial fields
    else if (req.method === "PATCH" && req.url.startsWith("/students/")) {
        const id = req.url.split("/")[2];
        const body = await getRequestData(req);

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: body }
        );

        res.end(JSON.stringify({ message: "Student Updated", result }));
    }

    // DELETE → Remove student
    else if (req.method === "DELETE" && req.url.startsWith("/students/")) {
        const id = req.url.split("/")[2];

        const result = await collection.deleteOne(
            { _id: new ObjectId(id) }
        );

        res.end(JSON.stringify({ message: "Student Deleted", result }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }

});

server.listen(3000, () => console.log("Server running on port 3000"));