const Post = require("../../models/posts").model;
 //listar todos post
const get =async() =>{    
    //const allPost= await Post.find({}).exec();
    const allPost= await Post.find({}).populate("usuario",'userName') ;
    return allPost;
}
//post by id
const getById = async (postId)=>{
    const post= await Post.findById(postId).exec();
   // const allPost= await Post.find({}).populate("usuario",'userName') ;
    return post;
}
//buscar
const find=async (titlePost)=>{
     const found = await Post.find({titlePost})
       if(found !== null){
         return found;    
        }
        else{
            return {status:404, message:"No Encontrado"}
        }
}
//crear post
const create = async (postData) => {
    const {titlePost,txtPost,usuario,tags,imgUrlPostTiltle,imgUrlPostContent,fecha} =  postData; 
    const  post = new Post({titlePost,txtPost,usuario,tags,imgUrlPostTiltle,imgUrlPostContent,fecha});
    const  savedPost= await post.save();
    return savedPost;
};

//modificar post update
const update =async (postId,postData) =>{
    const {titlePost,txtPost,tags,imgUrlPostTiltle,imgUrlPostContent,fecha} =  postData; 
    return Post.findByIdAndUpdate(postId,{titlePost,txtPost,tags,imgUrlPostTiltle,imgUrlPostContent,fecha}).exec();
}

//delete post 
const del = (postId)=>{
    return Post.findByIdAndDelete(postId).exec()
}

module.exports = {get,getById,create,update,del,find}