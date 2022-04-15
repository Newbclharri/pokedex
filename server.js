////////////////////////
// Setup - Import deps and create app object
////////////////////////
require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");


//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({"extended":false}));
app.use("/static", express.static("public"));
app.use(methodOverride("-method"));
app.use(morgan("tiny"));

///////////////////////
// Declare Routes and Routers 
///////////////////////
app.get("/", (req,res)=>{
    res.send("pokedex");
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>console.log("listening to catch'em all on port", PORT));