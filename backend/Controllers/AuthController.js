const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    // Choose cookie options depending on environment:
    // - production: cross-site requests (Netlify <-> Render) need SameSite=None and Secure=true
    // - development: localhost should use SameSite=lax and secure=false so the browser accepts the cookie
    const cookieOptions = process.env.NODE_ENV === "production" ? {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    } : {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || "Signup failed" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(400).json({ success: false, message:'All fields are required' })
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ success: false, message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(400).json({ success: false, message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     const cookieOptions2 = process.env.NODE_ENV === "production" ? {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    } : {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions2);
    res.status(201).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || "Login failed" });
  }
}