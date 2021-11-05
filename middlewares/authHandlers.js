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
  const verify = jwt.verify(apitoken ); 
  const {role} =verify
  if (role === "member") {
     next();
   } else {
       res.status(403).json({
       ok: false,
       message: "Unauthorized",
     });
   }
};


module.exports = {isAdmin,isMember};