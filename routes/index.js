const usersRouter =require ("./userRouter");
const authRouter =require ("./authRouter");
const postsRouter =require ("./postRouter");
const busquedapostRouter =require ("./busquedaPostRouter");
const tagRouter =require ("./tagRouter");

const apiRouter =(app) =>{
    app.use('/auth',authRouter)
    app.use('/users',usersRouter)
    app.use('/posts',postsRouter)
    app.use('/busquedaPost',busquedapostRouter)    
    app.use('/tags',tagRouter)
}
module.exports= apiRouter