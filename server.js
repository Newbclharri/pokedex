////////////////////////
// Setup - Import deps and create app object
////////////////////////
require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");

//////////////////////////////////////////////


//////////////////////
// Database
//////////////////////
const pokemon = require("./models/pokemon");
const pokeNames = getNames(pokemon);

console.log(pokeNames)
const pokeIndexes=[]
const pokedex = [
                    pokemon[0], pokemon[1], pokemon[2], pokemon[3], pokemon[4], pokemon[5], pokemon[6], 
                    pokemon[7], pokemon[8], pokemon[9], pokemon[10], pokemon[11]   
                ];

let pokeId = null;
let pokeIndex = null;

console.log(typeof(pokeNames))

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

//root
app.get("/", (req,res)=>{
    res.json({"pokedex": pokedex});
})

//index
app.get("/pokedex/", (req, res)=>{
    res.render("index.ejs", {pokedex: pokedex});
});

//new
app.get("/pokedex/new", (req, res) =>{
    res.render("new.ejs", {pokeNames: pokeNames})
});

app.post("/pokedex/", (req, res)=>{
    console.log(req.body.name)
    res.send(req.body);
});

//show
app.get("/pokedex/:id", (req, res) =>{
    let index = req.params.id;
    res.render("show.ejs",{pokemon: pokemon[index]})
});

///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>console.log("listening to catch'em all on port", PORT));

///////////////////////////
// Functions
///////////////////////////
function getNames(pokemonData){
    const array = [];
    pokemonData.forEach(pokemon =>{
        array.push(pokemon.name)
    });
    array.sort();
    return array;
}

function buildPokedex(name, pokeData){
    const arrayIndexes = []
    pokeData.forEach((element, index) =>{
        if(element.name === name){
            pokeIndexes.push(index);
        }
    })
    pokeIndexes.sort();
}

// function buildPokedex(){
//     for(let index of pokeIndexes){
//         pokedex.push(pokemon[index])
//     }
// }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }