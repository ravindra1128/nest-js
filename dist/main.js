"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Whats tha move')
        .setDescription('API dcoumentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
    }, 'accessToken')
        .addServer('http://localhost:3000/', 'Local')
        .addServer('https://dev-api2-olgucqwqka-ue.a.run.app/', 'Dev')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map