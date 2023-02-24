import dotenv from 'dotenv';
dotenv.config();

module.exports = {
	port: process.env.PORT,
	apiVersion: process.env.API_V,
};