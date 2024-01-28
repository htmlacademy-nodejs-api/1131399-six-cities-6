#!/usr/bin/env node
import { RestApplication } from './rest/index.js';
import { Logger } from './shared/libs/logger/index.js';
import { Config } from './shared/libs/config/rest.config.js';

async function bootstrap() {
  const logger = new Logger();
  const config = new Config(logger);
  const restApplication = new RestApplication(logger, config);
  await restApplication.init();
}

bootstrap();
