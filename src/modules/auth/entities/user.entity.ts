import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'TiendaDB', name: 'usuarios' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'nombre', nullable: false })
	nombre: string;

	@Column({ name: 'correo', nullable: false })
	correo: string;

	@Column({ name: 'contraseña', nullable: false })
	contraseña: string;

	@Column({ name: 'rol', nullable: false })
	rol: number;
}
