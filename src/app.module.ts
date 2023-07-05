import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
import Configuration from './configuration';
import * as Joi from 'joi';

@Module({
  // add environment variables configuration
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // let other modules access the configuration variables
      // envFilePath: envFilePath,
      // load: [() => dotenv.config({ path: envFilePath })],
      load: [Configuration], // use yaml to config the environment variables
      validationSchema: Joi.object({
        DB_PORT: Joi.number().default(3306),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
