#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { R3Scaffold, ScaffoldOptions } from '../core/scaffold';
import { ProjectType, R3Config } from '../config';
import { logger } from '../utils/logger';
import { Validator } from '../utils/validator';
import { VERSION, PROJECT_DESCRIPTION } from '../index';

const program = new Command();

program
  .name('r3')
  .description(PROJECT_DESCRIPTION)
  .version(VERSION);

program
  .command('create [project-name]')
  .alias('new')
  .description('Create a new R3 project')
  .option('-t, --type <type>', 'Project type (webapp, api, fullstack, cli, library, mobile, desktop)', 'webapp')
  .option('-p, --path <path>', 'Project path')
  .option('--skip-install', 'Skip dependency installation')
  .option('--skip-git', 'Skip git initialization')
  .option('-v, --verbose', 'Verbose output')
  .action(async (projectName: string | undefined, options: any) => {
    if (process.env.NO_ANIMATION !== 'true') {
      await logger.animateLogo('rivers', 1500);
    }
    logger.dynamicBanner('create');
    
    const answers = await promptProjectDetails(options, projectName);
    
    const config: R3Config = {
      name: answers.projectName,
      version: '0.1.0',
      description: answers.description,
      author: answers.author,
      license: answers.license,
      projectType: answers.projectType,
      features: answers.features || []
    };
    
    const projectPath = path.resolve(answers.projectPath || `./${answers.projectName}`);
    
    const scaffoldOptions: ScaffoldOptions = {
      projectName: answers.projectName,
      projectPath,
      config,
      skipInstall: options.skipInstall || answers.skipInstall,
      skipGit: options.skipGit || answers.skipGit,
      verbose: options.verbose
    };
    
    try {
      const scaffold = new R3Scaffold();
      await scaffold.create(scaffoldOptions);
    } catch (error: any) {
      logger.error(`Failed to create project: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize R3 in an existing project')
  .action(async () => {
    logger.dynamicBanner('init');
    logger.info('Initializing R3 in current directory...');
    
    await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: path.basename(process.cwd()),
        validate: (input: string) => {
          if (!Validator.isValidProjectName(input)) {
            const errors = Validator.getProjectNameErrors(input);
            return errors.join(', ');
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Project type:',
        choices: Object.values(ProjectType),
        default: ProjectType.WEBAPP
      }
    ]);
    
    logger.success('R3 initialized successfully!');
  });

program
  .command('list-templates')
  .alias('ls')
  .description('List available project templates')
  .action(async () => {
    if (process.env.NO_ANIMATION !== 'true') {
      await logger.animateLogo('particles', 1000);
    }
    logger.compactBanner();
    logger.info('Available project templates:');
    Object.values(ProjectType).forEach(type => {
      logger.info(`  • ${type}`);
    });
  });

async function promptProjectDetails(options: any, projectName?: string) {
  const questions: any[] = [];
  
  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (input: string) => {
        if (!Validator.isValidProjectName(input)) {
          const errors = Validator.getProjectNameErrors(input);
          return errors.join(', ');
        }
        return true;
      }
    });
  }
  
  questions.push(
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: 'A project built with R3 scaffold'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:'
    },
    {
      type: 'list',
      name: 'license',
      message: 'License:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'None'],
      default: 'MIT'
    }
  );
  
  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'projectType',
      message: 'Project type:',
      choices: [
        { name: 'Web Application', value: ProjectType.WEBAPP },
        { name: 'REST API', value: ProjectType.API },
        { name: 'Full Stack', value: ProjectType.FULLSTACK },
        { name: 'CLI Tool', value: ProjectType.CLI },
        { name: 'Library', value: ProjectType.LIBRARY },
        { name: 'Mobile App', value: ProjectType.MOBILE },
        { name: 'Desktop App', value: ProjectType.DESKTOP }
      ],
      default: ProjectType.WEBAPP
    });
  }
  
  questions.push(
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features:',
      choices: (answers: any) => getFeatureChoices(answers.projectType || options.type)
    },
    {
      type: 'confirm',
      name: 'skipInstall',
      message: 'Skip dependency installation?',
      default: false
    },
    {
      type: 'confirm',
      name: 'skipGit',
      message: 'Skip git initialization?',
      default: false
    }
  );
  
  const answers = await inquirer.prompt(questions);
  
  return {
    projectName: projectName || answers.projectName,
    ...answers,
    projectType: answers.projectType || options.type
  };
}

function getFeatureChoices(projectType: ProjectType) {
  const commonFeatures = [
    { name: 'TypeScript', value: 'typescript' },
    { name: 'ESLint', value: 'eslint' },
    { name: 'Prettier', value: 'prettier' },
    { name: 'Testing (Jest/Vitest)', value: 'testing' },
    { name: 'GitHub Actions', value: 'github-actions' }
  ];
  
  switch (projectType) {
    case ProjectType.WEBAPP:
      return [
        ...commonFeatures,
        { name: 'React', value: 'react' },
        { name: 'Vue', value: 'vue' },
        { name: 'Tailwind CSS', value: 'tailwind' },
        { name: 'PWA Support', value: 'pwa' }
      ];
    case ProjectType.API:
      return [
        ...commonFeatures,
        { name: 'Express', value: 'express' },
        { name: 'Fastify', value: 'fastify' },
        { name: 'Database (PostgreSQL)', value: 'postgres' },
        { name: 'Database (MongoDB)', value: 'mongodb' },
        { name: 'Authentication', value: 'auth' },
        { name: 'API Documentation', value: 'api-docs' }
      ];
    case ProjectType.CLI:
      return [
        ...commonFeatures,
        { name: 'Interactive Prompts', value: 'prompts' },
        { name: 'Progress Bars', value: 'progress' },
        { name: 'Colored Output', value: 'colors' }
      ];
    default:
      return commonFeatures;
  }
}

program.parse(process.argv);