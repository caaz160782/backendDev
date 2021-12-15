const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    titlePost:{
        type: String,
         //trim: true,
       //maxlenght:20,
       minlenght: 1,
       required: true,
    },    
    txtPost:{
        type: String,
        //trim: true,
       //maxlenght:50,
       minlenght: 1,
       //unique:true,
       required: true,
    },    
    usuario: {
        type: Schema.ObjectId,
        ref:"User",     
        required: true,        
       },
    tags :{ 
        type: Array,
        required: false,  
    },
    imgUrlPostTiltle:{
        type: String,
        required: false,
       minlenght: 1,
     },
    imgUrlPostContent:{
        type: String,
        required: false,
       minlenght: 1,
     },
    fecha:{
        type: Date
    },
    reactionsCount:{
         type :Number
        },
    countComment:{
        type:Number
    } ,
});  



module.exports= {
    model: mongoose.model("Post", schema),
    schema,            
};