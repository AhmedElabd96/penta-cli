#!/usr/bin/env node

import { Command } from 'commander';
import { registerCreateCommand } from './commands/create';
import * as packageJson from '../package.json';

/**
 * Main CLI entry point
 */
function main(): void {
  const program = new Command();

  program
    .name('penta-cli')
    .description('Penta-B CLI - Generate templates for plugins, layouts, and more')
    .version(packageJson.version);

  // Register commands
  registerCreateCommand(program);

  // Parse arguments
  program.parse(process.argv);

  // Show help if no command provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main();
