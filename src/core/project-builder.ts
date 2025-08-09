import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger';

const execAsync = promisify(exec);

export class ProjectBuilder {
  async initGit(projectPath: string): Promise<void> {
    try {
      logger.info('Initializing Git repository...');
      await execAsync('git init', { cwd: projectPath });
      await execAsync('git add .', { cwd: projectPath });
      await execAsync('git commit -m "Initial commit from R3 scaffold"', { cwd: projectPath });
      logger.success('Git repository initialized');
    } catch (error) {
      logger.warn('Failed to initialize Git repository');
    }
  }

  async installDependencies(projectPath: string): Promise<void> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      logger.warn('No package.json found, skipping dependency installation');
      return;
    }

    logger.info('Installing dependencies...');
    
    try {
      await execAsync('npm install', {
        cwd: projectPath,
        maxBuffer: 1024 * 1024 * 10
      });
      
      logger.success('Dependencies installed successfully');
    } catch (error) {
      logger.error('Failed to install dependencies');
      throw error;
    }
  }

  async runScript(projectPath: string, scriptName: string): Promise<void> {
    logger.info(`Running script: ${scriptName}`);
    
    try {
      await execAsync(`npm run ${scriptName}`, {
        cwd: projectPath,
        maxBuffer: 1024 * 1024 * 10
      });
      
      logger.success(`Script "${scriptName}" completed successfully`);
    } catch (error) {
      logger.error(`Failed to run script: ${scriptName}`);
      throw error;
    }
  }

  async buildProject(projectPath: string): Promise<void> {
    await this.runScript(projectPath, 'build');
  }

  async testProject(projectPath: string): Promise<void> {
    await this.runScript(projectPath, 'test');
  }
}