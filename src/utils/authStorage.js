const USERS_KEY = "jsk_users";
const CURRENT_USER_KEY = "jsk_current_user";

export const ADMIN_SECRET_CODE = "ISHI_ADMIN_2026";

const cleanText = (value) => {
  return value?.trim() || "";
};

const cleanEmail = (email) => {
  return cleanText(email).toLowerCase();
};

const removePassword = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const getUsers = () => {
  const savedUsers = localStorage.getItem(USERS_KEY);

  if (!savedUsers) {
    return [];
  }

  try {
    return JSON.parse(savedUsers);
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  const savedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const registerUser = ({
  name,
  email,
  phone,
  password,
  role = "user",
  adminCode = "",
}) => {
  const finalName = cleanText(name);
  const finalEmail = cleanEmail(email);
  const finalPhone = cleanText(phone);
  const finalPassword = cleanText(password);
  const finalRole = role === "admin" ? "admin" : "user";

  if (!finalName || !finalEmail || !finalPhone || !finalPassword) {
    return {
      success: false,
      message: "Please fill all required fields.",
    };
  }

  if (finalPassword.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  if (finalRole === "admin" && adminCode !== ADMIN_SECRET_CODE) {
    return {
      success: false,
      message: "Invalid admin secret code.",
    };
  }

  const users = getUsers();

  const emailAlreadyExists = users.some(
    (user) => cleanEmail(user.email) === finalEmail
  );

  if (emailAlreadyExists) {
    return {
      success: false,
      message: "Account already exists with this email.",
    };
  }

  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: finalName,
    email: finalEmail,
    phone: finalPhone,
    password: finalPassword,
    role: finalRole,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const loggedInUser = removePassword(newUser);
  setCurrentUser(loggedInUser);

  return {
    success: true,
    user: loggedInUser,
    message:
      finalRole === "admin"
        ? "Admin account created successfully."
        : "Account created successfully.",
  };
};

export const loginUser = ({ email, password, role = "user" }) => {
  const finalEmail = cleanEmail(email);
  const finalPassword = cleanText(password);
  const finalRole = role === "admin" ? "admin" : "user";

  if (!finalEmail || !finalPassword) {
    return {
      success: false,
      message: "Please enter email and password.",
    };
  }

  const users = getUsers();

  const foundUser = users.find(
    (user) =>
      cleanEmail(user.email) === finalEmail &&
      user.password === finalPassword &&
      user.role === finalRole
  );

  if (!foundUser) {
    return {
      success: false,
      message: "Invalid email, password or role.",
    };
  }

  const loggedInUser = removePassword(foundUser);
  setCurrentUser(loggedInUser);

  return {
    success: true,
    user: loggedInUser,
    message: "Login successful.",
  };
};

export const isLoggedIn = () => {
  return Boolean(getCurrentUser());
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user?.role === role;
};

export const isAdmin = () => {
  return hasRole("admin");
};

export const isUser = () => {
  return hasRole("user");
};