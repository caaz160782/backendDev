const express=  require("express");
const router = express.Router()
const post = require("../usecases/posts");
const {isMember }= require("../middlewares/authHandlers");

router.get("/",async (request, response, next)=>{
      const {titlePost} = request.query
      try{    
        const postInfo = await post.find(titlePost)
        response.json({
                ok:true,
                message:"Done",
                listPost:{ postInfo },
            })
     }
    catch (error){
    next(error)
    response.status(404).json({
        ok:false,
        message:"Post not found"
   })
  }
}) 

router.get("/:idPost",isMember,async (request, response, next)=>{
  const {idPost}   = request.params;
  const userId = request.id;  
  const postInfo = await post.getById(idPost)
 console.log(postInfo);
  if(postInfo !==null) {
   console.log(1)
   const {usuario }= postInfo
   const {_id}=usuario
   
     if(userId ===_id.toString())   
      { 
        try{    
              const postInfo = await post.getById(idPost)
              const {_id}=postInfo
               response.json({
                      ok:true                      
                  })
          }
          catch (error){
          next(error)
                response.status(404).json({
                    ok:false,
                    message:"Post not found"
              })
        }
      }
      else{
        response.status(404).json({
          ok:false,
          message:"this operation is not possible"
        })
      }
    }
    else{
        response.status(404).json({
        ok:false,
        message:"this operation is not possible"
        }) 
    } 
}) 




module.exports = router;