import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { AsciiArt } from './ascii-art';
import { AnimatedLogo } from './animated-logo';
import { NonBlockingAnimation } from './non-blocking-animation';

class Logger {
  private spinner: Ora | null = null;
  private animationFrame: number = 0;
  private animationInterval: NodeJS.Timeout | null = null;

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
    this.spinner = ora({
      text: message,
      spinner: {
        interval: 100,
        frames: ['◐', '◓', '◑', '◒']
      },
      color: 'cyan'
    }).start();
  }

  startAnimatedSpinner(message: string): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    this.animationFrame = 0;
    this.animationInterval = setInterval(() => {
      const spinner = AnimatedLogo.getSpinner(this.animationFrame);
      process.stdout.write(`\r${spinner} ${message}`);
      this.animationFrame++;
    }, 100);
  }

  stopAnimatedSpinner(success: boolean = true, message?: string): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
      process.stdout.write('\r\x1b[K'); // Clear line
      if (message) {
        if (success) {
          this.success(message);
        } else {
          this.error(message);
        }
      }
    }
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
    console.log(AsciiArt.getWelcomeBanner());
  }

  dynamicBanner(command?: string): void {
    console.log(AnimatedLogo.getDynamicBanner(command));
  }

  async animateLogo(type: 'water' | 'fluid' | 'ripple' | 'rivers' | 'particles' = 'fluid', duration: number = 2000): Promise<void> {
    await AnimatedLogo.animateLogo(type, duration);
  }

  flowingRivers(): void {
    console.log(AnimatedLogo.getFlowingRivers());
  }

  logo(style?: 'default' | 'banner' | 'large' | 'minimalist' | 'stylized' | '3d'): void {
    console.log(AsciiArt.getColoredLogo(style));
  }

  banner(): void {
    console.log(AsciiArt.getFullBanner());
  }

  compactBanner(): void {
    console.log(AsciiArt.getCompactBanner());
  }

  quickSplash(command?: string): void {
    NonBlockingAnimation.quickSplash(command);
  }

  parallelDisplay(type: 'compact' | 'full' | 'dynamic', content: () => void | Promise<void>): void {
    NonBlockingAnimation.parallelDisplay(type, content);
  }

  startNonBlockingAnimation(type: 'water' | 'fluid' | 'ripple' | 'rivers' | 'particles' = 'fluid'): void {
    NonBlockingAnimation.startHeaderAnimation(type);
  }
}

export const logger = new Logger();