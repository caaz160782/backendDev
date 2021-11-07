const Tag = require("../../models/tags").model;


//listar todos usuarios
const get =async() =>{    
    const allTags= await Tag.find({}).exec();
    return allTags;
}

module.exports = {get}