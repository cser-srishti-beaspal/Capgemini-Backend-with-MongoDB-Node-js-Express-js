const express = require('express');
const app = express();

let users = [
    {
        id: 1,
        "name": "srishti"
    },
    {
        id: 2,
        "name": "isha"
    }
]

//MIDDLEWARE
app.use(express.json());
//HOME
app.get("/", (req, res) => {
    res.send("<h1>hi</h1>")
})
//GET
app.get("/users", (req, res) => {
    res.status(200).json(users);
})

// POST
app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json({
    message: "User added",
    users,
  });
});

//POST
// app.post("/users", (req, res) => {
//     //console.log(req.body);
//     let user = req.body;
//     users.push(user);
//     res.status(200).json(users);
// })
//PUT
// app.put("/users/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedUser = req.body;
//     users = users.map((user) =>
//         user.id === id ? updatedUser : user
//     );
//     res.status(200).json(users);
// });

// PUT using ternary operator + map()
// send id in body
app.put("/users", (req, res) => {
  users = users.map((user) =>
    user.id === req.body.id ? { ...user, ...req.body } : user,
  );
  res.status(200).json({
    message: "User updated",
    users,
  });
});

// PATCH using ternary operator + map()
// send id in body
app.patch("/users", (req, res) => {
  users = users.map((user) =>
    user.id === req.body.id ? { ...user, ...req.body } : user,
  );
  res.status(200).json({
    message: "User patched",
    users,
  });
});

// DELETE using ternary operator + filter()
// send id in body
app.delete("/users", (req, res) => {
  users = users.filter((user) => (user.id === req.body.id ? false : true));
  res.status(200).json({
    message: "User deleted",
    users,
  });
});

//DELETE
// app.delete("/users/:id", (req, res) => {
//     // const id = parseInt(req.params.id);
//     users = users.filter((user) => user.id !== id);
//     res.status(200).json(users);
// });

app.listen(3000, (err) => {
    if (err) throw err
    console.log("Sever running at http://localhost:3000")

})
