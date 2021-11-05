const jwt =require("../lib/jwt")

const isAdmin = (req, res, next) => {
  const { apitoken } = req.headers;
  const verify = jwt.verify(apitoken ); 
  const {role} =verify
  if (role === "admin") {
     next();
   } else {
       res.status(403).json({
       ok: false,
       message: "Unauthorized",
     });
   }
};

const isMember = (req, res, next) => {
  const { apitoken } = req.headers;
      if(apitoken !==undefined)
      {
        try
        {
          const verify = jwt.verify(apitoken ); 
          //console.log("tok",verify)
          const {role,sub} =verify
             if (role === "member") {
                 req.id=sub; 
                 next();
              }else 
                {
                  res.status(403).json({
                  ok: false,
                  message: "Unauthorized",
                });   
             }
        }
        catch(error)
        {
         console.log("error",error.name)
         let  {name}=error;
          if(name==="TokenExpiredError"){
             res.status(401).json({
             message: "timeExpired",
            }); 
          }
          else if(name==="JsonWebTokenError"){
             res.status(403).json({
              ok: false,
              message: "Unauthorized",
            });  
          }
         }
      }
      else{
        res.status(403).json({
        message: "Unauthorized",})
      }   
};


module.exports = {isAdmin,isMember};