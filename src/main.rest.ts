#!/usr/bin/env node
import { RestApplication } from './rest/index.js';
import { Logger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new Logger();
  const restApplication = new RestApplication(logger);
  await restApplication.init();
}

bootstrap();
