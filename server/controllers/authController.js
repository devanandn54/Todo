const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if(!userName || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        //check if user exists
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            userName,
            email,
            password,
            profileImage: req.file ? req.file.filename : undefined,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
        
    }
}
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(500).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);
        res.status(200).json({token});
        

    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
        
    }
}

module.exports = {registerController, loginController}