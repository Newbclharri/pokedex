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

// console.log(pokeNames)
const pokeIndexes=[0,1,2,3,4,5,6,7,8,9,10,11];
let pokedex = [];
// buildPokedex();

let pokeId = null;
let pokeIndex = null;

console.log(typeof(pokeNames))

//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({"extended":false}));
app.use("/static", express.static("public"));
app.use(methodOverride("_method"));
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
    res.render("index.ejs", {pokedex: pokedex, pokeIndexes: pokeIndexes, pokemon:pokemon});
});

//new
app.get("/pokedex/new", (req, res) =>{
    res.render("new.ejs", {pokeNames: pokeNames})
});

app.post("/pokedex/", (req, res)=>{
    console.log(req.body.name)
    pushIndex(req.body.name, pokemon)
    // pokedex = [];
    // buildPokedex()
    res.redirect("/pokedex/")
});

//show
app.get("/pokedex/:id", (req, res) =>{
    let index = req.params.id;
    res.render("show.ejs",{pokemon: pokemon[index]})
});

//delete
app.delete("/pokedex/:id", (req, res) =>{
    const index = pokeIndexes.indexOf(+req.params.id);
    pokeIndexes.splice(index,1);
    res.redirect("/pokedex/")
})

///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>console.log("catchin'em all on port", PORT));

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

function pushIndex(name, pokeData){

    pokeData.forEach((element, index) =>{
        if(element.name === name){
            if(!pokeIndexes.includes(index)){
                pokeIndexes.push(index);
            }
        }
    })
    pokeIndexes.sort((a,b)=>a-b);
    
}

function buildPokedex(){
    for(let index of pokeIndexes){
        pokedex.push(pokemon[index])
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }