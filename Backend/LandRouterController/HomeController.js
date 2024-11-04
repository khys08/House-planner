const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HomeData = require('../Model/ArchitectBulidModel');
const LoginData = require('../Model/Login');
const ToolData = require('../Model/ToolData'); // Removed duplicate import

// Function to handle user registration
const postSignin = async (req, res) => {
    const { email, role, password } = req.body;

    try {
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const signinData = await LoginData.create({ role, email, password: hashPassword });

        res.status(200).json({
            role: signinData.role,
            email: signinData.email,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(400).json({ error: "Failed to register user", details: error.message });
    }
};

// Function to handle user login
const checkLogin = async (req, res) => {
    const { role, email, password } = req.body;

    try {
        // Find the user in the database
        const result = await LoginData.findOne({ role, email });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ role: result.role, message: "Login successful" });
    } catch (error) {
        res.status(400).json({ error: "Login failed", details: error.message });
    }
};

// Function to handle posting land data
const postLandData = async (req, res) => {
    const { Building, Area, BedRoom, DiningRoom, Kitchen } = req.body;
    let HouseImage = {};

    if (req.file) {
        HouseImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    try {
        const homeData = await HomeData.create({ Building, Area, BedRoom, DiningRoom, Kitchen, HouseImage });
        res.status(200).json(homeData);
    } catch (error) {
        console.error('Error in postLandData:', error);
        res.status(400).json({ error: "Failed to save home data", details: error.message });
    }
};

// Function to handle getting land data
const getLandData = async (req, res) => {
    try {
        const { Building, Area, BedRoom, DiningRoom, Kitchen } = req.query;

        // Fetch home data based on query parameters
        const homeData = await HomeData.find({ Building, Area, BedRoom, DiningRoom, Kitchen });

        if (homeData.length === 0) {
            return res.status(404).json({ message: 'No home data found' });
        }

        // Map the response data
        const responseData = homeData.map(home => ({
            Building: home.Building,
            Area: home.Area,
            BedRoom: home.BedRoom,
            DiningRoom: home.DiningRoom,
            Kitchen: home.Kitchen,
            HouseImage: home.HouseImage && home.HouseImage.data ? {
                contentType: home.HouseImage.contentType,
                data: home.HouseImage.data.toString('base64')
            } : null
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error in getLandData:', error);
        res.status(400).json({ error: 'Failed to retrieve home data', details: error.message });
    }
};

// Function to handle posting tool data
const postToolData = async (req, res) => {
    const { Image } = req.body; // Expecting image data to be sent in the body

    try {
        await ToolData.create({ Image }); // Fixed: Await the creation of tool data
        res.status(200).json('Tool data saved successfully');
    } catch (error) {
        console.error('Error in postToolData:', error);
        res.status(400).json({ error: "Failed to save tool data", details: error.message });
    }
};

module.exports = {
    postLandData,
    getLandData,
    postToolData,
    postSignin,
    checkLogin
};
