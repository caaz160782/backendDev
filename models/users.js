const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    fullName:{
        type: String,       
            trim: true,
       maxlenght:20,
       minlenght: 1,
       required: true,
    },    
    userName:{
        type: String,
        required: false,
            trim: true,
       maxlenght:50,
       minlenght: 1,
       unique:true,
    },    
    role:String,
    pictureProfileUser:String,
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