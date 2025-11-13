import { Command } from 'commander';
import * as path from 'path';
import { TemplateGenerator } from '../utils/template';
import { Logger } from '../utils/logger';

/**
 * Create command - handles template generation
 */
export function registerCreateCommand(program: Command): void {
  const create = program
    .command('create')
    .description('Create a new project from a template');

  // Create plugin command
  create
    .command('plugin <name>')
    .description('Create a new plugin from template')
    .action(async (name: string) => {
      try {
        Logger.header('🚀 Creating new plugin');
        Logger.info(`Plugin name: ${name}`);

        const generator = new TemplateGenerator();
        const targetPath = path.join(process.cwd(), name);

        await generator.generate({
          templateName: 'plugins',
          targetName: name,
          targetPath,
          variables: {
            projectName: name,
          },
        });

        Logger.success(`\nPlugin "${name}" created successfully!`);
        Logger.info(`\nNext steps:`);
        Logger.step(`cd ${name}`);
        Logger.step('npm install');
        Logger.step('npm run dev');
      } catch (error) {
        Logger.error(`Failed to create plugin: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  // Create layout command
  create
    .command('layout <name>')
    .description('Create a new layout from template')
    .action(async (name: string) => {
      try {
        Logger.header('🚀 Creating new layout');
        Logger.info(`Layout name: ${name}`);

        const generator = new TemplateGenerator();
        const targetPath = path.join(process.cwd(), name);

        // Check if layout template exists
        const layoutExists = await generator.templateExists('layouts');

        if (!layoutExists) {
          Logger.warning('Layout template not found yet.');
          Logger.info('The layout template will be available in a future update.');
          Logger.info('For now, you can add your layout template to: templates/layouts/');
          process.exit(0);
        }

        await generator.generate({
          templateName: 'layouts',
          targetName: name,
          targetPath,
          variables: {
            projectName: name,
          },
        });

        Logger.success(`\nLayout "${name}" created successfully!`);
        Logger.info(`\nNext steps:`);
        Logger.step(`cd ${name}`);
        Logger.step('npm install');
        Logger.step('npm run dev');
      } catch (error) {
        Logger.error(`Failed to create layout: ${(error as Error).message}`);
        process.exit(1);
      }
    });
}
