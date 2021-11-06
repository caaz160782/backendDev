const express=  require("express");
const router = express.Router()
const post = require("../usecases/posts");
const {isMember }= require("../middlewares/authHandlers");

//recuperar todos los post
router.get("/",async (request, response ,next)=>{
    try{    
     const allPost= await post.get();
     response.json({
         ok:true,
         message:"Done",
         listUser:{
            allPost
         }
     })
   }
    catch (error){
    next(error)
  } 
 })

//by id
router.get("/:idPost",async (request, response, next)=>{
    const {idPost} = request.params   
    //const idUser=request.id;
    //console.log(idUser);
    try{    
        const postInfo = await post.getById(idPost)
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

///crear post
router.post('/',isMember,async (request,response,next) =>{
    try{
     const userPosts= request.body;
     const postCreated= await post.create(userPosts);
     response.status(201).json({
         ok: true,
         message: "Created successfully",
         payload:{
            postCreated
         },
     }) 
    }
     catch (error){
      next(error)
    } 
 })
 //modificar
 router.patch('/:idPost',isMember,async (request,response,next) =>{
    const {idPost}   = request.params;
    const  postsData = request.body 
    const userId=request.id;
    const postInfo = await post.getById(idPost)
    const {usuario}=postInfo
    if(userId ===usuario.toString())   
     { 
          try{
              const postUpdate=  await post.update(idPost,postsData); 
              response.status(201).json({
                  ok: true,
                  message: `Actualizado`,
                  listPost:{
                  postUpdate
                  },
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
          message:"Post not modificado"
      })
    }   

})

router.delete('/:idPost',isMember,async(request,response,next) =>{
  const {idPost}   = request.params;
  const  postsData = request.body 
  const userId=request.id;

  const postInfo = await post.getById(idPost)

  const {usuario}=postInfo
  if(userId ===usuario.toString())   
   { 
    try{
      const {idPost} = request.params;
      const postId= post.del(idPost);
      response.status(202).json({
          success: true,
          message: `Deleted  successfully`,        
      })  
     }
     catch (error){
      next(error)
    } 
   }
   else
   {
     response.status(404).json({
      ok:false,
      message:"Delete not modificado"
     })
   } 
})

 module.exports = router;