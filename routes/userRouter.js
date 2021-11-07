const express=  require("express");
const router = express.Router()
const {isAdmin, isMember }= require("../middlewares/authHandlers");
const user = require("../usecases/users");
const { check } = require("express-validator")
const {validarCampos}= require("../middlewares/validarCampos");
const {emailExiste,existeuserName} =require("../lib/verificar")

router.get("/:idUser",isMember,async (request, response, next)=>{
    const {idUser} = request.params   
    try{    
        const userId = await user.getById(idUser)
        response.json({
                ok:true,
                message:"Done",
                listUser:{ userId },
            })
     }
    catch (error){
    //next(error)
    response.status(404).json({
        ok:false,
        message:"User not found"
   })
  }
})

//estos se mostrarian solo al administrador
router.get("/",async (request, response ,next)=>{
   try{    
    const users= await user.get();
    response.json({
        ok:true,
        message:"Done",
        listUser:{
            users
        }
    })
  }
   catch (error){
   next(error)
 } 
})
//crea a todos
router.post('/',[check('email').custom(emailExiste),
                 check('userName').custom(existeuserName),
                 check("role", "no es un rol permitido").isIn('admin', 'member'),
                 validarCampos]
                ,async (request,response,next) =>{
   try{
    const userData= request.body;
    const userCreated= await user.create(userData);
    response.status(201).json({
        status: "ok",
        message: "Created successfully",
        payload:{
            userCreated
        },
    }) 
   }
    catch (error){
     next(error)
   } 
})
//modificar usuario
router.patch('/:idUser',isMember,async (request,response,next) =>{
    const {idUser}   =request.params;
    const   userId   =request.id;
    const userData   =request.body
    if(idUser === userId)
    {
        try{
            const userUpdate=  await user.update(idUser,userData); 
                 response.status(201).json({
                              ok: true,
                              message: `Actualizado`,
                              listUser:{
                              userUpdate
                              },
                   })         
        }
        catch (error){
        next(error)
        response.status(404).json({
                status:false,
                message:"User not found"
            })
        }
    }
  else{
    response.status(404).json({
        ok:false,
        message: "Unauthorized",
        
    })
  }
})

router.delete('/:idUser',isAdmin,(request,response,next) =>{
  try{
    const {idUser} = request.params;
    const userId= user.del(idUser);
    response.status(202).json({
        ok: true,
        message: `Deleted  ${idUser} successfully`,        
    })  
   }
   catch (error){
    next(error)
  } 
})

module.exports = router;