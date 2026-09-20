const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

// the all User will render in one time
app.get("/api/users", (req, res) => {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);

    res.json(users);
  });
});

app.get("/api/users/:id", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "users not found",
      });
    }
    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const userss = users.find((user) => user.id === id);
    res.status(200).json(userss);
  });
});

// Add the data to the db
app.post("/api/users", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to read users",
      });
    }

    const users = JSON.parse(data);

    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      userRoll: req.body.userRoll,
      createdAt: new Date().toLocaleDateString(),
    };
    users.push(newUser);

    fs.writeFile("./data/data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save user",
        });
      }
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    });
  });
});

// Update the users data
app.put("/api/users/:id", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to read users.json",
      });
    }
    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.json({
        message: "user not found",
      });
    }
    const updateUser = {
      id: id,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      userRoll: req.body.userRoll,
      createdAt: users[userIndex].createdAt,
    };
    users[userIndex] = updateUser;

    fs.writeFile("./data/data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update user",
        });
      }
      res.json({
        message: "User updated successfully",
        user: updateUser,
      });
    });
  });
});

app.delete("/api/users/:id", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to read users.json",
      });
    }
    const users = JSON.parse(data);

    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    fs.writeFile("./data/data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to delete user",
        });
      }

      res.json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    });
  });
});

app.listen(1212, () => {
  console.log("Port runing on 1212");
});
