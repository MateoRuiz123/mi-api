import { Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
	console.log("body", req.body);
	const { name, email, password, confirmPassword, birth_year } = req.body;

	// Crear un nuevo usuario
	const newUser = new User({ name, email, password, confirmPassword, birth_year });
	await newUser.save();

	res.status(201).json(newUser);
};

export const getUserById = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId);
	if (!user) {
		return res.json({
			code: 404,
			text: 'User not found'
		});
	}
	res.json({
		code: 200,
		text: 'User found',
		user
	});
};
