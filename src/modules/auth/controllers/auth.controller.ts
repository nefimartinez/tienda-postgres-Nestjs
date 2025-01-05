import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginUserDto: LoginUserDto) {
		console.log('llamando al metodo login: ', loginUserDto);
		return this.authService.login(loginUserDto);
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() createUserDto: CreateUserDto) {
		console.log('llamando al metodo register: ', CreateUserDto);
		return this.authService.register(createUserDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout() {
		return this.authService.logout();
	}
}
