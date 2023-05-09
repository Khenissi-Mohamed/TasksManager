
const errorHandler = (err, req, res, next) => {

  
	if (err.statusCode) {
		const error = {
			statusCode: err.statusCode,
			message: err.message,
		};
		console.log(error.message);
		res.status(error.statusCode).json(error.message);
	} else {
		res.status(500).json({
			message: "Erreur interne du serveur",
		});
	}
};



module.exports = errorHandler;


