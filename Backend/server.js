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
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json(user);
});

// post the users data
app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "Name, email and age are required",
    });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// put/ update the data
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  //   request to the body again
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({
      message: "name and email and age aren't found",
    });
  }

  user.name = name;
  user.age = age;
  user.email = email;

  res.status(200).json(user);
});
app.listen(9000, () => {
  console.log("server is runing on port 9000");
});
