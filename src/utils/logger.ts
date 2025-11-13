import chalk from 'chalk';

/**
 * Logger utility for consistent CLI output
 */
export class Logger {
  static success(message: string): void {
    console.log(chalk.green('✓'), message);
  }

  static error(message: string): void {
    console.log(chalk.red('✗'), message);
  }

  static info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  static warning(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  static step(message: string): void {
    console.log(chalk.cyan('→'), message);
  }

  static header(message: string): void {
    console.log('\n' + chalk.bold.cyan(message) + '\n');
  }
}
