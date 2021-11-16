module.exports = app => {
  const controller = app.controllers.containers;

  app.route('/api/v1/containers')
    .get(controller.listcontainers)
    .post(controller.savecontainers)
    .delete(controller.removeAllcontainers);

  app.route('/api/v1/containers/:customerId')
    .get(controller.listByIdcontainers)
    .delete(controller.removecontainers)
    .put(controller.updatecontainers);
}