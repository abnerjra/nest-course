export const pokemonIds: number[] = [1, 4, 7, 90, 12];

interface Pokemon {
    id: number;
    name: string;
    age?: number;
}

export const bullbasaur: Pokemon = {
    id: 1,
    name: 'Bullbasaur'
};

export const charmander: Pokemon = {
    id: 4,
    name: "Charmander"
}

export const pokemons: Pokemon[] = [];
pokemons.push(charmander, bullbasaur);