import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { loginSchema, registerSchema } from '../schemas/auth-validacion.schemas';
import * as Joi from 'joi';

@Controller('/v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginUserDto: LoginUserDto) {
		const { error } = loginSchema.validate(loginUserDto);
		if (error) {
			throw new BadRequestException(error.details[0].message);
		}
		return this.authService.login(loginUserDto);
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() createUserDto: CreateUserDto) {
		const { error } = registerSchema.validate(createUserDto);
		if (error) {
			throw new BadRequestException(error.details[0].message);
		}
		return this.authService.register(createUserDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout() {
		return this.authService.logout();
	}
}
