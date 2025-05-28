import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user

const loginUser = async (req, res) =>{
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Check if the user exists
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Create a token
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

//register user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    
    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }
        // validate email format and password strength
            if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
        if (password.length < 8) {
        return res.status(400).json({ message: "Please Enter a strong password" });
    }
    // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
        });
    
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { loginUser, registerUser };