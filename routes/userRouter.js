const express=  require("express");
const router = express.Router()
const {isAdmin, isMember }= require("../middlewares/authHandlers");
const user = require("../usecases/users");


router.get("/:idUser",isMember,async (request, response, next)=>{
    //const {idUser} = request.params   
    const idUser=request.id;
    console.log(idUser);
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
router.get("/",isAdmin,async (request, response ,next)=>{
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

router.post('/',async (request,response,next) =>{
   try{
    const userData= request.body;
    const userCreated= await user.create(userData);
    response.status(201).json({
        ok: true,
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

router.patch('/:idUser',isMember,async (request,response,next) =>{
    const {idUser} = request.params;
    const userData=request.body
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
   //  next(error)
   response.status(404).json({
        ok:false,
        message:"User not found"
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