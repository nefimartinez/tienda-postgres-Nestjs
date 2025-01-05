import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsEmail()
	@IsNotEmpty()
	correo: string;

	@IsString()
	@IsNotEmpty()
	contraseña: string;
}
