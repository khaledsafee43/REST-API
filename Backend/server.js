const exress = require("express");
const app = exress();

app.use(exress.json());

let users = [
  {
    id: 1,
    name: "Ahmad",
    email: "ahmad@gmail.com",
    age: 22,
  },
  {
    id: 2,
    name: "Ali",
    email: "ali@gmail.com",
    age: 25,
  },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

// api/users/:id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => {
    user.id === id;
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json(user);
});
app.listen(9000, () => {
  console.log("server is runing on port 9000");
});
