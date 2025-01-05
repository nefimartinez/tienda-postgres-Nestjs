import * as Joi from 'joi';

export const loginSchema = Joi.object({
	nombre: Joi.string().required().messages({
		'string.base': `El nombre debe ser de tipo texto`,
		'string.empty': `El nombre no debe estar vacío`,
		'any.required': `El nombre es requerido`
	}),
	correo: Joi.string().email().required().messages({
		'string.base': `El correo debe ser de tipo texto`,
		'string.empty': `El correo no debe estar vacío`,
		'string.email': `El correo debe ser un email válido`,
		'any.required': `El correo es requerido`
	}),
	contraseña: Joi.string().min(4).required().messages({
		'string.base': `La contraseña debe ser de tipo texto`,
		'string.empty': `La contraseña no debe estar vacía`,
		'string.min': `La contraseña debe tener al menos {#limit} caracteres`,
		'any.required': `La contraseña es requerida`
	})
})
	.required()
	.messages({
		'any.required': `Los datos son requeridos`
	});

export const registerSchema = Joi.object({
	nombre: Joi.string().required().messages({
		'string.base': `El nombre debe ser de tipo texto`,
		'string.empty': `El nombre no debe estar vacío`,
		'any.required': `El nombre es requerido`
	}),
	correo: Joi.string().email().required().messages({
		'string.base': `El correo debe ser de tipo texto`,
		'string.empty': `El correo no debe estar vacío`,
		'string.email': `El correo debe ser un email válido`,
		'any.required': `El correo es requerido`
	}),
	contraseña: Joi.string().min(4).required().messages({
		'string.base': `La contraseña debe ser de tipo texto`,
		'string.empty': `La contraseña no debe estar vacía`,
		'string.min': `La contraseña debe tener al menos {#limit} caracteres`,
		'any.required': `La contraseña es requerida`
	}),
	rol: Joi.number().integer().valid(1, 2).required().messages({
		'number.base': `El rol debe ser de tipo numérico`,
        'number.integer': `El rol debe ser un número entero`,
        'number.valid': `El rol debe ser 1 o 2`,
        'any.required': `El rol es requerido`
	})
})
	.required()
	.messages({});
