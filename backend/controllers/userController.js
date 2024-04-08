// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../services/emailService');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(username,email)
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        // Send registration confirmation email
        await sendEmail(email, "Registration Successful", "Welcome to our platform!");

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username ." });
        }

        if (await user.comparePassword(password)) {
            const token = jwt.sign({ username }, process.env.SECRET_KEY);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate a temporary password
        const temporaryPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        
        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Send temporary password via email
        await sendEmail(email, "Password Reset", `Your temporary password is: ${temporaryPassword}`);
        
        res.json({ message: "Temporary password sent to your email." });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        // Get profile logic
    } catch (error) {
        next(error);
    }
};
