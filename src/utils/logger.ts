import chalk from 'chalk';
import ora, { Ora } from 'ora';

class Logger {
  private spinner: Ora | null = null;

  info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  success(message: string): void {
    console.log(chalk.green('✔'), message);
  }

  warn(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  error(message: string): void {
    console.log(chalk.red('✖'), message);
  }

  debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(chalk.gray('[DEBUG]'), message);
    }
  }

  startSpinner(message: string): void {
    this.spinner = ora(message).start();
  }

  stopSpinner(success: boolean = true, message?: string): void {
    if (this.spinner) {
      if (success) {
        this.spinner.succeed(message);
      } else {
        this.spinner.fail(message);
      }
      this.spinner = null;
    }
  }

  river(): void {
    console.log(chalk.cyan(`
    ╔═══════════════════════════════════════╗
    ║     R3 - River 3 Scaffold            ║
    ║     三江源 - The Source of Rivers     ║
    ╚═══════════════════════════════════════╝
    `));
  }
}

export const logger = new Logger();