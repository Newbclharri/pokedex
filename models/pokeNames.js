const pokemon = require("./pokemon");
const pokeNames = [];

pokemon.forEach(pokemon =>{
    pokeNames.push(pokemon.name);
});

// console.log(pokeNames);

pokeNames.sort();

module.exports = pokeNames