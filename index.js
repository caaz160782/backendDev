const express=  require("express");
const apiRouter= require("./routes");
const cors = require("cors");

const config = require("./lib/config");
const app = express();
const port = config.app.port;

const db =require("./lib/db");

//escucha todas las solicitudes para parsear a json
app.use(express.json());

app.get("/",(request, response)=>{
    response.send("hello world en express");
})
app.use(cors());
apiRouter(app);
/*
//app.use(logErrors);
//app.use(errorHandler);
//levantar el servidor
*/
app.listen(port, ()=>{
    console.log(`listening on port: htpp://localhost: ${port}`);
    db.connect().then(()=>{
        console.log("DB conected");
    }).catch((err)=>{
        console.error("Connection refused", err)  ;
    })
})