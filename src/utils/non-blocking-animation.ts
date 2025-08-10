import chalk from 'chalk';
import readline from 'readline';
import { AnimatedLogo } from './animated-logo';

export class NonBlockingAnimation {
  private static activeAnimation: NodeJS.Timeout | null = null;
  private static isAnimating = false;
  private static rl: readline.Interface | null = null;

  /**
   * Start a non-blocking animation in the header area
   * Content can be displayed below while animation plays
   */
  static startHeaderAnimation(
    type: 'water' | 'fluid' | 'ripple' | 'rivers' | 'particles' = 'fluid',
    duration: number = 3000
  ): void {
    if (process.env.NO_ANIMATION === 'true' || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    
    // Reserve space for animation (7 lines for logo)
    console.log('\n\n\n\n\n\n\n');
    
    // Move cursor up to animation area
    process.stdout.write('\x1b[7A');
    
    let frame = 0;
    const fps = 15;
    const interval = 1000 / fps;
    const startTime = Date.now();
    
    // Setup input listener to cancel animation on keypress
    if (!this.rl) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      // Make input non-blocking
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
      }
      
      process.stdin.once('data', () => {
        this.stopAnimation();
      });
    }
    
    this.activeAnimation = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= duration) {
        this.stopAnimation();
        return;
      }
      
      // Save cursor position
      process.stdout.write('\x1b[s');
      
      // Move to animation area
      process.stdout.write('\x1b[H');
      
      // Clear animation area
      for (let i = 0; i < 7; i++) {
        process.stdout.write('\x1b[K\n');
      }
      
      // Move back up
      process.stdout.write('\x1b[7A');
      
      // Draw animation frame
      let output = '';
      switch (type) {
        case 'fluid':
          output = AnimatedLogo.getFluidLogo('wave', frame);
          break;
        case 'water':
          output = AnimatedLogo.getAnimatedWater(frame);
          break;
        case 'ripple':
          output = AnimatedLogo.getRippleEffect(20, 3, frame * 0.1);
          break;
        case 'rivers':
          output = AnimatedLogo.getFlowingRivers(frame);
          break;
        case 'particles':
          output = AnimatedLogo.getParticleFlow(frame);
          break;
      }
      
      console.log(output);
      
      // Restore cursor position
      process.stdout.write('\x1b[u');
      
      frame++;
    }, interval);
  }

  /**
   * Display a quick splash animation that doesn't block
   */
  static quickSplash(command?: string): void {
    if (process.env.NO_ANIMATION === 'true') {
      return;
    }

    const banner = AnimatedLogo.getDynamicBanner(command);
    console.log(banner);
  }

  /**
   * Stop the current animation
   */
  static stopAnimation(): void {
    if (this.activeAnimation) {
      clearInterval(this.activeAnimation);
      this.activeAnimation = null;
    }
    
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
    
    if (process.stdin.isTTY && process.stdin.setRawMode) {
      process.stdin.setRawMode(false);
    }
    
    this.isAnimating = false;
    
    // Clear animation area and move cursor to content area
    process.stdout.write('\x1b[2J\x1b[H');
  }

  /**
   * Show animated banner with content below
   */
  static showAnimatedBanner(content: () => void): void {
    if (process.env.NO_ANIMATION === 'true') {
      content();
      return;
    }

    // Show initial frame immediately
    const initialFrame = AnimatedLogo.getFluidLogo('wave', 0);
    console.log(initialFrame);
    console.log(chalk.cyan('─'.repeat(50)));
    
    // Show content immediately
    content();
    
    // Start non-blocking animation in background
    let frame = 0;
    const animation = setInterval(() => {
      // Save cursor
      process.stdout.write('\x1b[s');
      
      // Move to top
      process.stdout.write('\x1b[H');
      
      // Update logo
      const logo = AnimatedLogo.getFluidLogo('wave', frame);
      const lines = logo.split('\n');
      lines.forEach((line, i) => {
        process.stdout.write(`\x1b[${i + 1};1H\x1b[K${line}`);
      });
      
      // Restore cursor
      process.stdout.write('\x1b[u');
      
      frame++;
      
      // Stop after 3 seconds
      if (frame > 45) {
        clearInterval(animation);
      }
    }, 67); // ~15fps
  }

  /**
   * Display logo and content simultaneously
   */
  static parallelDisplay(
    logoType: 'compact' | 'full' | 'dynamic' = 'compact',
    content: () => void | Promise<void>
  ): void {
    if (process.env.NO_ANIMATION === 'true') {
      // Just show static logo and content
      if (logoType === 'compact') {
        console.log(AnimatedLogo.getDynamicBanner());
      }
      content();
      return;
    }

    // Display static logo first
    const logo = AnimatedLogo.getDynamicBanner();
    console.log(logo);
    
    // Execute content immediately
    const contentPromise = content();
    
    // If content is async, we can animate while it loads
    if (contentPromise instanceof Promise) {
      let frame = 0;
      const loadingAnimation = setInterval(() => {
        const spinner = AnimatedLogo.getSpinner(frame);
        process.stdout.write(`\r${spinner} Loading...`);
        frame++;
      }, 100);
      
      contentPromise.finally(() => {
        clearInterval(loadingAnimation);
        process.stdout.write('\r\x1b[K'); // Clear loading line
      });
    }
  }
}