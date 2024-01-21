#!/usr/bin/env node
import { CLIApplication } from './cli/index.js';
import { HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.register([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
