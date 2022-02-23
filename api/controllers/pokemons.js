const uuidv4 = require('uuid/v4');

module.exports = app => {
    const docker = {};
    const pokemonsDB = app.data.pokemons;
    const controller = {};

    const {
        pokemons: pokemonsMock,
    } = pokemonsDB;

    //Funcionando
    controller.listByIdpokemons = (req, res) => {
        const {
            pokemonId,
        } = req.params.pokemonId;

        const foundPokemonIndex = pokemonsMock.data.find(pokemon => pokemon.id.toString() === req.params.pokemonId);

        if (foundPokemonIndex === -1 || foundPokemonIndex === undefined) {
            res.status(404).json({
                message: 'Pokemon não encontrado na base.',
                success: false,
                pokemons: foundPokemonIndex,
            });
        } else {
            //pokemonsMock.data.splice(foundPokemonIndex, 1);
            res.status(200).json(foundPokemonIndex);
        }
    };

    //Funcionando
    controller.listpokemons = (req, res) => {
        res.status(200).json(pokemonsDB.pokemons.data)
    }

    //Funcionando
    controller.savepokemons = (req, res) => {
        pokemonsMock.data.push({
            id: req.body.id,//uuidv4(),
            title: req.body.title,
        });

        res.status(201).json(pokemonsMock);
    };

    //Funcionando
    controller.removepokemons = (req, res) => {
        const {
            pokemonId,
        } = req.params.pokemonId;

        const foundPokemonIndex = pokemonsMock.data.findIndex(pokemon => pokemon.id.toString() === req.params.pokemonId);

        if (foundPokemonIndex === -1) {
            res.status(404).json({
                message: 'Pokemon não encontrado na base.',
                success: false,
                pokemons: pokemonsMock,
            });
        } else {
            pokemonsMock.data.splice(foundPokemonIndex, 1);
            res.status(200).json({
                message: 'Pokemon encontrado e deletado com sucesso!',
                success: true,
                pokemons: pokemonsMock,
            });
        }
    };

    //Funcionando
    controller.updatepokemons = (req, res) => {
        const {
            pokemonId,
        } = req.params.pokemonId;

        const foundCustomerIndex = pokemonsMock.data.findIndex(pokemon => pokemon.id.toString() === req.params.pokemonId);

        if (foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Pokemon não encontrado na base.',
                success: false,
                pokemon: pokemonsMock,
            });
        } else {
            const newPokemon = {
                id: req.body.id,//uuidv4(),
                title: req.body.title,
            };

            pokemonsMock.data.splice(foundCustomerIndex, 1, newPokemon);

            res.status(200).json({
                message: 'Pokemon encontrado e atualizado com sucesso!',
                success: true,
                pokemon: pokemonsMock,
            });
        }
    }
    
    //Funcionando
    controller.removeAllpokemons = (req, res) => {
        pokemonsMock.data = []

        res.status(200).json({
            message: 'Pokemons deletados com sucesso!',
            success: true,
            pokemons: pokemonsMock,
        });
    };

    return controller;
}