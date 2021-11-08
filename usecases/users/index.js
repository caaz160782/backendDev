const User = require("../../models/users").model;
const hash =require("../../lib/crypt")
const jwt =require("../../lib/jwt")

//listar todos usuarios
const get =async() =>{    
    const allUser= await User.find({}).exec();
    return allUser;
}

//ver los detalles de usurio id
const getById = async (userId)=>{
    const user= await User.findById(userId).exec();
    return user;
}

//login
const find=async (userAccess)=>{
    const{ email,pasword} =  userAccess;     
    const found = await User.findOne({email}).exec();   
    if(found !== null){
        const {_id,fullName,role,password,userName,email,pictureProfileUser} = found;
        const match = await hash.verifyPassword(pasword,password);
        if(match){
            const payload = {
                            sub:_id.toString(),
                            name:`${fullName}`, 
                            role
                        }
        const token =  jwt.token(payload)       
        return {token,fullName,userName,email,_id,pictureProfileUser}
        }
    else{
    return {status:404, message:"No encontrado"}
      }     
    }
     else{
        return {status:404, message:"No registrado"}
     }
}

//crear user
const create = async (userData) => {
     const {fullName,userName,email,pictureProfileUser="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeik6d5EHLTi89m_CKLXyShylk4L92YflpJQ&usqp=CAU", pasword,role="member"} =  userData; 
     const  passwordHash= await hash.hashPassword(pasword);          
     //const  user = new User({fullName,role,userName,password:passwordHash});
     const  user = new User({fullName,role,userName,email,pictureProfileUser,password:passwordHash});
     const  savedUser= await user.save();
     return savedUser;
};
/*
//eliminar
const del = (userId)=>{
    return User.findByIdAndDelete(userId).exec()
}
*/
//update
const update =async (userId,userData) =>{
<<<<<<< HEAD
    
    const{fullName,pictureProfileUser,userName,password} =  userData;  
            if(password !== ""){
                const  passwordHash= await hash.hashPassword(password);      
                return User.findByIdAndUpdate(userId,{fullName,pictureProfileUser,userName,password:passwordHash},{new: true}).exec() ;
             }
            else{
                return User.findByIdAndUpdate(userId,{fullName,pictureProfileUser,userName},{new: true}).exec() ;
=======
      const{fullName,password, userName } =  userData;  
      console.log(userData);
            if(password !== ""){
                const  passwordHash= await hash.hashPassword(password);      
                return User.findByIdAndUpdate(userId,{fullName,userName,password:passwordHash}).exec() ;
             }
            else{
                return User.findByIdAndUpdate(userId,{fullName, userName}).exec() ;
>>>>>>> c2e872a1ded848a42500b0ee52fe39cf8f38502f
     }

 }

module.exports = {get, getById,create,update,find}