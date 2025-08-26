// controllers/eweekAuthController.js
import EweekLoginSchema from "../models/EweekLogin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// ✅ Register (save email + hashed password)
export async function register(req, res) {
  try {
    const { Email, Password } = req.body;

    // check if email already exists
    const existingUser = await EweekLoginSchema.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new EweekLoginSchema({ Email, Password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Login (check email + password)
export async function login(req, res) {
  try {
    const { Email, Password } = req.body;

    const user = await EweekLoginSchema.findOne({ Email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // compare hashed password
    const validPassword = await bcrypt.compare(Password, user.Password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate JWT
    const token = jwt.sign({ Email: user.Email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
