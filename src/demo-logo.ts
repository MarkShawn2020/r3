#!/usr/bin/env node

import { logger } from './utils/logger';
import { AnimatedLogo } from './utils/animated-logo';
import chalk from 'chalk';

async function demo() {
  console.clear();
  
  console.log(chalk.bold.cyan('\n=== R3 Logo Animation Demo ===\n'));
  
  // Demo 1: Flowing Rivers
  console.log(chalk.yellow('1. Three Rivers Flow Animation:'));
  await AnimatedLogo.animateLogo('rivers', 3000);
  
  await sleep(1000);
  console.clear();
  
  // Demo 2: Particle Flow
  console.log(chalk.yellow('2. Particle Flow Animation:'));
  await AnimatedLogo.animateLogo('particles', 3000);
  
  await sleep(1000);
  console.clear();
  
  // Demo 3: Ripple Effect
  console.log(chalk.yellow('3. Ripple Effect Animation:'));
  await AnimatedLogo.animateLogo('ripple', 3000);
  
  await sleep(1000);
  console.clear();
  
  // Demo 4: Fluid Logo
  console.log(chalk.yellow('4. Fluid Logo Animation:'));
  await AnimatedLogo.animateLogo('fluid', 3000);
  
  await sleep(1000);
  console.clear();
  
  // Demo 5: Dynamic Banner
  console.log(chalk.yellow('5. Dynamic Banners:'));
  console.log(AnimatedLogo.getDynamicBanner('create'));
  await sleep(2000);
  
  console.clear();
  console.log(AnimatedLogo.getDynamicBanner('init'));
  await sleep(2000);
  
  console.clear();
  console.log(AnimatedLogo.getDynamicBanner('build'));
  await sleep(2000);
  
  // Demo 6: Animated Spinner
  console.clear();
  console.log(chalk.yellow('6. Animated Spinner:'));
  logger.startAnimatedSpinner('Loading R3 components...');
  await sleep(3000);
  logger.stopAnimatedSpinner(true, 'R3 components loaded successfully!');
  
  await sleep(1000);
  
  // Final message
  console.log(chalk.bold.green('\n✨ Demo Complete!'));
  console.log(chalk.gray('R3 - River 3 - 三江源'));
  console.log(chalk.italic.gray('Super Scaffold for Independent Developers\n'));
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run demo if this file is executed directly
if (require.main === module) {
  demo().catch(console.error);
}