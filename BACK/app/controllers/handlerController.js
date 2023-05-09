
const handlerController = (controller) => {

  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.log("handler controller erreur", err);
      next(err);
    }  
  };
};

module.exports = handlerController;