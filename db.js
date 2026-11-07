const UserSchema = {
  id: "string",
  email: "string",
  role: "string",
  isActive: "boolean",
};

const users = [
  { id: "usr_1", email: "alice@example.com", role: "admin", isActive: true },
  { id: "usr_2", email: "bob@example.com", role: "developer", isActive: true },
];

function findUserById(id) {
  if (!id) throw new Error("User ID is required");
  return users.find((u) => u.id === id) || null;
}

function createUser({ email, role = "developer" }) {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email format");
  }
  const newUser = {
    id: `usr_${Date.now()}`,
    email,
    role,
    isActive: true,
  };
  users.push(newUser);
  return newUser;
}

module.exports = {
  UserSchema,
  findUserById,
  createUser,
};
