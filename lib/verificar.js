const User = require("../models/users").model;

const emailExiste = async (email = "") =>{
    const existeEmail = await User.findOne({ email })
    if (existeEmail) {
      throw new Error("el correo ya esta registrado")
    }
   }

 const existeuserName = async (userName = "") =>{
    const existeuserName = await User.findOne({ userName })
    if (existeuserName) {
      throw new Error("el username ya esta registrado")
    }
   }


  module.exports = {emailExiste,existeuserName}   