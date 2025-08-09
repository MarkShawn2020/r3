#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('{{projectName}}')
  .description('{{description}}')
  .version('{{projectVersion}}');

program
  .command('hello [name]')
  .description('Say hello')
  .action((name = 'World') => {
    console.log(chalk.green(`Hello, ${name}!`));
  });

program.parse(process.argv);