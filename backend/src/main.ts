import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configService } from "./services/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.getPort();

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(port);
}
bootstrap();
