const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// User Data

let users = [
  {
    id: 1,
    name: "Khaled Saifee",
    email: "saifeekhaled1212@gmail.com",
    age: 19,
  },
  {
    id: 2,
    name: "Khaled",
    email: "saifeekhaled1@gmail.com",
    age: 25,
  },
  {
    id: 3,
    name: "Ali",
    email: "ali@gmail.com",
    age: 24,
  },
];
// the all User will render in one time
app.get("/api/users", (req, res) => {
  res.json(users);
});

// The user rendered by your id that you have entered
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  res.status(200).json(user);
});

// Add the data to the db
app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({
      message: "user not fount",
    });
  }
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    age,
  };
  users.push(newUser);

  res.status(200).json(newUser);
});

// Update the users data
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "name, email and age are required",
    });
  }
  user.name = name;
  user.email = email;
  user.age = age;
  res.status(201).json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((index) => index.id === id);

  if (userIndex === -1) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  const deleteUser = users.splice(userIndex, 1);

  res.status(201).json({
    message: "User deleted successfully",
    user: deleteUser[0],
  });
});

app.listen(1212, () => {
  console.log("Port runing on 1212");
});
