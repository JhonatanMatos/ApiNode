module.exports = app => {
  const controller = app.controllers.pokemons;

  app.route('/api/v1/pokemons')
    .get(controller.listpokemons)//Funciona
    .post(controller.savepokemons)//Funciona (ver caso do id)
    .delete(controller.removeAllpokemons);//Funciona

  app.route('/api/v1/pokemons/:pokemonId')
    .get(controller.listByIdpokemons)//Não funciona
    .delete(controller.removepokemons)//Funciona
    .put(controller.updatepokemons);//Funciona (ver caso do id)
}