import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			validationSchema: Joi.object({
				//validacion de las variables de entorno
				PORT: Joi.number().required(),
				POSTGRES_USER: Joi.string().default(3000).required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_HOST: Joi.string().default('localhost').required(),
				POSTGRES_PORT: Joi.number().default(5432).required(),
				POSTGRES_DB: Joi.string().required(),
				POSTGRES_SCHEMA: Joi.string().default('public').required()
			})
		})
	]
})
export class AppConfigModule {}
