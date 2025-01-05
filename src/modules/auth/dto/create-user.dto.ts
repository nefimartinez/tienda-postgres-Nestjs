import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsEmail()
	@IsNotEmpty()
	correo: string;

	@IsString()
	@MinLength(4)
	@IsNotEmpty()
	contraseña: string;

	@IsNotEmpty()
	rol: number;
}
