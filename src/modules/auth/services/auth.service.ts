import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async register(createUserDto: CreateUserDto) {
		const { nombre, correo, contraseña, rol } = createUserDto;

		// Validar entrada
		if (!nombre || !correo || !contraseña || !rol) {
			throw new HttpException(
				'Faltan datos obligatorios',
				HttpStatus.BAD_REQUEST
			);
		}

		// Verificar si ya existe el usuario
		const existingUser = await this.userRepository.findOne({
			where: { nombre, correo }
		});
		if (existingUser) {
			throw new HttpException(
				'Ya existe un usuario con este nombre y correo',
				HttpStatus.CONFLICT
			);
		}

		// Encriptar contraseña
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(contraseña, salt);

		// Crear el nuevo usuario
		const newUser = this.userRepository.create({
			nombre,
			correo,
			contraseña: hashedPassword,
			rol
		});
		await this.userRepository.save(newUser);

		return {
			message: 'Usuario registrado exitosamente',
			user: {
				nombre: newUser.nombre,
				correo: newUser.correo,
				rol: newUser.rol
			}
		};
	}

	async login(loginUserDto: LoginUserDto) {
		const { nombre, correo, contraseña } = loginUserDto;

		// Validar entrada
		if (!nombre || !correo || !contraseña) {
			throw new HttpException(
				'Faltan datos obligatorios',
				HttpStatus.BAD_REQUEST
			);
		}

		// Buscar usuario y correo
		const user = await this.userRepository.findOne({
			where: { nombre, correo }
		});
		if (!user) {
			throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
		}

		// Validar contraseña
		const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
		if (!isPasswordValid) {
			throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
		}

		// Retornar datos del usuario
		return {
			message: 'Usuario logueado correctamente',
			user: {
				nombre: user.nombre,
				correo: user.correo,
				rol: user.rol
			}
		};
	}

	async logout() {
		return { message: 'Sesión cerrada exitosamente' };
	}
}
