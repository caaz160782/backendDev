const express=  require("express");
const router = express.Router()
const user = require("../usecases/users");


router.post('/',async (request,response,next) =>{
    try{
     const userAccess= request.body;
     const resFind= await user.find(userAccess);
     if( resFind === 404){
          response.status(404).json({
            status:404,
            message:"Not found"
        })
     }else{
       const {token}=resFind;
          response.status(202).json({
           status: "ok",
           //role  :role,
           token :token,
      })     
     }
    }
     catch (error){
      next(error)
    } 
 })

module.exports = router;