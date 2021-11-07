const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    fullName:{
        type: String,       
            trim: true,
       maxlenght:20,
       minlenght: 1,
       required: false,
    },    
    userName:{
        type: String,
        required: true,
            trim: true,
       maxlenght:50,
       minlenght: 1,
       unique:true,
    },
    email:{
        type: String,
        required: true,
            trim: true,
       maxlenght:50,
       minlenght: 1,
       unique:true,
    },        
    role:{
        type:String,
    },
    pictureProfileUser:{ 
        type:String, 
    },
    password: {
        type: String,
        required: true,
        minlenght:1,
    },
});  

module.exports= {
    model: mongoose.model("User", schema),
    schema,            
};