const express=  require("express");
const router = express.Router()
const user = require("../usecases/users");
const {validarCampos}= require("../middlewares/validarCampos");
const { check } = require("express-validator")



router.post('/',[check("email", "el correo no es valido").isEmail(),validarCampos] ,async (request,response,next) =>{
    try{
     const userAccess= request.body;
     const resFind= await user.find(userAccess);
     const {status,message}=resFind;
     if( status=== 404){
          response.status(404).json({
            status:404,
            message
        })
     }else{
          const {token,_id,fullName,userName,email,pictureProfileUser}=resFind;          
          response.status(202).json({
           status: "ok",
           vim: 95142,
           token :token,
           user:{
              _id, 
              fullName,
              userName,
              email,
              pictureProfileUser
           }
      })     
     }
    }
     catch (error){
      next(error)
    } 
 })

module.exports = router;