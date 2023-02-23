//! npm i jsonwebtoken

const jwt = require('jsonwebtoken');

const checkUsersCredentials = require('./auth.controllers');
const response  = require('../utils/responses.handler');

const  jwtSecret = require('../../config').api.jwtSecret



const postLogin = (req, res) => {
	const { email, password } = req.body;
	checkUsersCredentials(email, password)
		.then((data) => {
			if (data) {
				const token = jwt.sign(
					{
						id: data.id,
						email: data.email,
					},
					jwtSecret
				);
				response.success({
					res,
					status: 200,
					message: 'correct credentials',
					data: token,
				});
			} else {
				response.error({
					res,
					status: 401,
					message: 'invalid credentials',
				});
			}
		})
		.catch((err) => {
			response.error({
				res,
				status: 400,
				data: err,
				message: err.message,
			});
		});
};

module.exports = postLogin;
