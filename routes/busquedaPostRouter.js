const express=  require("express");
const router = express.Router()
const post = require("../usecases/posts");

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




module.exports = router;