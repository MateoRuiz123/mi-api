import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
	const schema: ObjectSchema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(8),
		confirmPassword: Joi.ref('password'),
		birth_year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } }).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) { 
		return res.status(400).json({ error: error.details.map(detail => detail.message), mensaje: 'Error en la validación de los datos' });
	}

	next();
};
