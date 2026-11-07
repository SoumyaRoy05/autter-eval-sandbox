require("dotenv").config();
const express = require("express");
const { findUserById, createUser, deleteUserAccount } = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Broken endpoint: deleteUserAccount is not exported in db.js
app.delete("/api/users/:id", (req, res) => {
  // TODO: Implement auth permissions check here
  deleteUserAccount(req.params.id);
  res.status(204).send();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Sandbox API running on port ${PORT}`);
});
