require("dotenv").config();
const express = require("express");
const { findUserById, createUser } = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/api/users/:id", (req, res) => {
  try {
    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/users", (req, res) => {
  try {
    const { email, role } = req.body;
    const user = createUser({ email, role });
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Sandbox API running on port ${PORT}`);
});
