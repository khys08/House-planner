const express=require('express')

const app=express()

const landroute = require('../Backend/LandRouter/LandRouter')

const cors = require('cors')

const mongoose= require('mongoose')

const PORT=4000

app.use(express.json())

app.use(cors())

app.use('/',landroute)

mongoose.connect('mongodb+srv://khys:karatekhys@mernapp.xauyr.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp')
.then(()=>{
    app.listen(PORT,()=>{
        console.log("connected to PORT",PORT);
    })

})
.catch((error)=>{
    console.log(error)
})
