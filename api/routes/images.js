module.exports = app => {
  const controller = app.controllers.images;

  app.route('/api/v1/images')
    .get(controller.listimages)
    .post(controller.saveimages)
    .delete(controller.removeAllimages);

  app.route('/api/v1/images/:customerId')
    .get(controller.listByIdimages)
    .delete(controller.removeimages)
    .put(controller.updateimages);
}