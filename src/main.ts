import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const port = configService.get<number>('PORT'); // obtenemos el puerto del archivo .env

	// configuraciones globales
	app.enableCors(); // cors
	app.setGlobalPrefix('apiTienda/v1'); // prefijo para las rutas o endpoints

	await app.listen(port);
	console.log(`Aplicación corriendo en el puerto ${port}`);
}
bootstrap();
