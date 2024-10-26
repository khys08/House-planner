const mongoose = require('mongoose');

const bcrypt = require('bcrypt')

const HomeData = require('../Model/ArchitectBulidModel');

const LoginData = require('../Model/Login')

const toolData = require('../Model/ToolData');
const ToolData = require('../Model/ToolData');


 

const postSignin = async (req, res) => {
    const { email, role, password } = req.body;

    try {
    
        const hashPassword = await bcrypt.hash(password, 10);

        const signinData = await LoginData.create({ role,email,password: hashPassword });

        res.status(200).json({
            role: signinData.role,
            email: signinData.email,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(400).json({ error: "Failed to register user", details: error });
    }
};

const checkLogin = async (req, res) => {
    const { role, email, password } = req.body;

    try {
        
        const result = await LoginData.findOne({ role, email });

        
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }


        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }


        res.status(200).json({ role:result.role, message: "Login successful" });
    } catch (error) {
        res.status(400).json({ error: "Login failed", details: error });
    }
};


const postLandData = async(req,res)=>{
    const {Building,Area,BedRoom,DiningRoom,Kitchen} = req.body
    let HouseImage={};
    if(req.file){
        HouseImage={
            data:req.file.buffer,
            contentType:req.file.mimetype
        }
    }

    try{
    const homeData = await HomeData.create({Building,Area,BedRoom,DiningRoom,Kitchen,HouseImage})
    res.status(200).json(homeData);
    }
    catch(error){
        res.status(400).json(error);
        console.log(error)
    }
          

}
const getLandData = async (req, res) => {
    try {

        const {Building,Area,BedRoom,DiningRoom,Kitchen} = req.query

        const homeData = await HomeData.find({Building,Area,BedRoom,DiningRoom,Kitchen} ) 
        
        if (homeData.length===0) {
            return res.status(404).json({ message: 'No home data found' });
        }


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

const postToolData = async(req,res)=>{
    const Image = req.body.image

    try{
        const toolData = ToolData.create({Image})
        res.status(200).json('Tooldata saved')
    }
    catch(error){
        res.status(400).json(error);
    }



}

module.exports = {
    postLandData,
    getLandData,
    postToolData,
    postSignin,
    checkLogin

}