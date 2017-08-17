const functions = require("firebase-functions");

exports.redirect = functions.https.onRequest((request, response) => {
	response.redirect(`/#${request.path}`);
});
