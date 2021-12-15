const express=  require("express");
const router = express.Router()
//const Tag = require("../../models/tags").model;
const tag = require("../usecases/tags");

router.get("/",async (request, response, next)=>{
    try{    
        const tags = await tag.get();
        response.json({
                ok:true,
                message:"Done",
                payload:tags,
            })
    }
    catch (error){
      next(error)   
    }
}) 

module.exports = router;