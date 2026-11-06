import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, course, yearOfStudy } = req.body;

    // 1. Check required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 2. Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    // 3. Check whether email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // 4. Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Create the user
    const user = await prisma.user.create({
      data: {
        fullName,
        email: normalizedEmail,
        passwordHash,
        course,
        yearOfStudy,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        course: true,
        yearOfStudy: true,
        createdAt: true,
      },
    });

    // 6. Send success response
    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4. Check JWT configuration
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    // 5. Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    // 6. Send successful response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      accessToken: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        course: user.course,
        yearOfStudy: user.yearOfStudy,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
};
