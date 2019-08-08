/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import {MongooseModuleOptions, MongooseOptionsFactory} from "@nestjs/mongoose";

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService implements MongooseOptionsFactory {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
// mongodb://root:1234567890@localhost:27017/cpt
// mongodb://localhost/cpt
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            API_VERSION: Joi.number().default(1),
            SERVER_PORT: Joi.number().default(5555),
            SERVER_HOST: Joi.string().default('0.0.0.0'),
            PUBLIC_PATH: Joi.string().default(''),
            DB_URI: Joi.string().default('mongodb://localhost/cpt'),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    createMongooseOptions(): MongooseModuleOptions {
        const out: any =  {
            type: 'mongodb',
            uri: String(this.envConfig.DB_URI),
        };
        // tslint:disable-next-line:no-console
        console.log(out);
        return out;
    }

    get apiVersion(): number {
        return Number(this.envConfig.API_VERSION);
    }

    get port(): number {
        return Number(this.envConfig.SERVER_PORT);
    }

    get host(): string {
        return String(this.envConfig.SERVER_HOST);
    }

    get publicPath(): string {
        return path.join('public');
    }
}
