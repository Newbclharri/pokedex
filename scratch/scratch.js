const { findIndex } = require("../models/pokemon");
const pokemon = require("../models/pokemon");

console.log(pokemon[0]);

// pokemon.forEach(pokemon => {
//     console.log(pokemon.id, pokemon.name)
// })

const pokeNames = [];

pokemon.forEach(pokemon =>{
    pokeNames.push(pokemon.name);
});

// console.log(pokeNames);

pokeNames.sort();

console.log("alpha order:",pokeNames);

// console.log(+pokemon[0].id === 001)

// console.log(pokemon[0].moves.level.length, pokemon[0].moves.level)

// pokemon.forEach((pokemon, index) =>{
//     if(+pokemon.id === 5){
//         console.log(index, pokemon);
//         return
//     }
// })

const pokedex = [pokemon[0], pokemon[1], pokemon[2]];

for(i = 0; i < pokedex.length; i++){
    let arryStatKeys = Object.keys(pokedex[i].stats)
    let stats = pokedex[i].stats;
    console.log(stats)
    let statKey = arryStatKeys[i];
    // console.log("Stat key: ", statKey, "| Value:", +stats[statKey]);

    for(skill in stats){
        console.log(pokemon[i].name, skill, ":", +stats[skill])
    }

    stats = null;
}

for(let ability of pokemon[0].misc.abilities.normal){
    console.log(ability)
}