import * as fs from 'fs-extra';
import * as path from 'path';
import ora from 'ora';
import { Logger } from './logger';

export interface TemplateOptions {
  templateName: string;
  targetName: string;
  targetPath: string;
  variables?: Record<string, string>;
}

/**
 * Template utility for copying and processing template files
 */
export class TemplateGenerator {
  private templatesDir: string;

  constructor() {
    // Templates are located relative to the dist folder after build
    this.templatesDir = path.join(__dirname, '../../templates');
  }

  /**
   * Check if template exists
   */
  async templateExists(templateName: string): Promise<boolean> {
    const templatePath = path.join(this.templatesDir, templateName);
    return fs.pathExists(templatePath);
  }

  /**
   * Generate a project from template
   */
  async generate(options: TemplateOptions): Promise<void> {
    const { templateName, targetName, targetPath, variables = {} } = options;

    const spinner = ora('Generating project from template...').start();

    try {
      // Verify template exists
      const templatePath = path.join(this.templatesDir, templateName);
      const exists = await fs.pathExists(templatePath);

      if (!exists) {
        spinner.fail(`Template "${templateName}" not found`);
        throw new Error(`Template "${templateName}" does not exist`);
      }

      // Check if target directory already exists
      if (await fs.pathExists(targetPath)) {
        spinner.fail(`Directory "${targetName}" already exists`);
        throw new Error(`Directory "${targetName}" already exists`);
      }

      spinner.text = 'Creating project directory...';
      await fs.ensureDir(targetPath);
      Logger.step(`Created directory: ${targetName}`);

      // Copy template files
      spinner.text = 'Copying template files...';
      await this.copyTemplate(templatePath, targetPath, variables);

      spinner.succeed('Template generated successfully!');
    } catch (error) {
      spinner.fail('Failed to generate template');
      throw error;
    }
  }

  /**
   * Recursively copy template files and replace variables
   */
  private async copyTemplate(
    sourcePath: string,
    targetPath: string,
    variables: Record<string, string>
  ): Promise<void> {
    const entries = await fs.readdir(sourcePath, { withFileTypes: true });

    for (const entry of entries) {
      const sourceFile = path.join(sourcePath, entry.name);
      const targetFile = path.join(targetPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively copy directories
        await fs.ensureDir(targetFile);
        Logger.step(`Created directory: ${path.relative(targetPath, targetFile)}`);
        await this.copyTemplate(sourceFile, targetFile, variables);
      } else {
        // Copy and process file
        await this.copyAndProcessFile(sourceFile, targetFile, variables);
        Logger.step(`Created file: ${path.relative(targetPath, targetFile)}`);
      }
    }
  }

  /**
   * Copy a file and replace template variables
   */
  private async copyAndProcessFile(
    sourcePath: string,
    targetPath: string,
    variables: Record<string, string>
  ): Promise<void> {
    const ext = path.extname(sourcePath);

    // Text-based files that should be processed
    const processableExtensions = [
      '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt',
      '.css', '.scss', '.sass', '.html', '.xml', '.yml', '.yaml',
      '.sh', '.dockerfile', '.npmrc', '.babelrc'
    ];

    const isProcessable =
      processableExtensions.includes(ext.toLowerCase()) ||
      ['.babelrc', '.npmrc', 'Dockerfile'].includes(path.basename(sourcePath));

    if (isProcessable) {
      // Read file as text and replace variables
      let content = await fs.readFile(sourcePath, 'utf-8');

      // Replace all variables in the format ${variableName}
      for (const [key, value] of Object.entries(variables)) {
        const pattern = new RegExp(`\\$\\{${key}\\}`, 'g');
        content = content.replace(pattern, value);
      }

      await fs.writeFile(targetPath, content, 'utf-8');
    } else {
      // Binary files, just copy
      await fs.copy(sourcePath, targetPath);
    }
  }
}
