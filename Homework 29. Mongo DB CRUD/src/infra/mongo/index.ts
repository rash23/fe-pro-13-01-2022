import mongoose from 'mongoose';

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const connect = async () => {
	return await mongoose.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.27n0v.mongodb.net/?retryWrites=true&w=majority`

		// 'mongodb+srv://Rash:2030Rash@cluster0.27n0v.mongodb.net/?retryWrites=true&w=majority'
	);
};
