const mongoose = require('mongoose')

const ToolData = mongoose.Schema({

    Image:{
        type:Object,
        required:true,
    }

    }

)

module.exports = mongoose.model('toolData',ToolData)
