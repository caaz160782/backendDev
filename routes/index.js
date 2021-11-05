const usersRouter =require ("./userRouter");
const authRouter =require ("./authRouter");

const apiRouter =(app) =>{
    app.use('/auth',authRouter)
    app.use('/users',usersRouter)
    /*app.use('/products',productsRouter)
    app.use('/categories',categoriesRouter)
    app.use('/users',userRouter)*/
    
}
module.exports= apiRouter