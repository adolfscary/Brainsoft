import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const options = new DocumentBuilder()
    .setTitle("Brainsoft challenge - pokemons")
    .setVersion("1.0")
    .addBearerAuth({
      description: "Email authorization",
      type: "http",
      in: "header",
      scheme: "bearer",
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`API is listening on http://localhost:${port}`);
  console.log(
    `Api OpenAPI / Swagger is listening on http://localhost:${port}/api`,
  );
}
bootstrap();
