import fs from 'fs-extra';
import path from 'path';
import { R3Config, ProjectType } from '../config';
import { TemplateEngine } from './template-engine';
import { ProjectBuilder } from './project-builder';
import { logger } from '../utils/logger';

export interface ScaffoldOptions {
  projectName: string;
  projectPath: string;
  config: R3Config;
  skipInstall?: boolean;
  skipGit?: boolean;
  verbose?: boolean;
}

export class R3Scaffold {
  private templateEngine: TemplateEngine;
  private projectBuilder: ProjectBuilder;

  constructor() {
    this.templateEngine = new TemplateEngine();
    this.projectBuilder = new ProjectBuilder();
  }

  async create(options: ScaffoldOptions): Promise<void> {
    const { projectName, projectPath, config } = options;
    
    logger.info(`🌊 Initializing R3 project: ${projectName}`);
    logger.info(`📍 Location: ${projectPath}`);
    
    await this.validateProjectPath(projectPath);
    
    await fs.ensureDir(projectPath);
    
    await this.generateProjectStructure(projectPath, config);
    
    await this.templateEngine.processTemplates(projectPath, config);
    
    if (!options.skipGit) {
      await this.projectBuilder.initGit(projectPath);
    }
    
    if (!options.skipInstall) {
      await this.projectBuilder.installDependencies(projectPath);
    }
    
    logger.success(`✨ R3 project "${projectName}" created successfully!`);
    logger.info(`🚀 Get started:`);
    logger.info(`   cd ${path.basename(projectPath)}`);
    logger.info(`   npm run dev`);
  }

  private async validateProjectPath(projectPath: string): Promise<void> {
    if (await fs.pathExists(projectPath)) {
      const files = await fs.readdir(projectPath);
      if (files.length > 0) {
        throw new Error(`Directory ${projectPath} already exists and is not empty`);
      }
    }
  }

  private async generateProjectStructure(projectPath: string, config: R3Config): Promise<void> {
    const structure = this.getProjectStructure(config.projectType);
    
    for (const dir of structure.directories) {
      await fs.ensureDir(path.join(projectPath, dir));
    }
    
    for (const [filePath, content] of Object.entries(structure.files)) {
      await fs.writeFile(
        path.join(projectPath, filePath),
        content as string,
        'utf-8'
      );
    }
  }

  private getProjectStructure(projectType: ProjectType): {
    directories: string[];
    files: Record<string, string>;
  } {
    const baseStructure = {
      directories: ['src', 'tests', 'docs'],
      files: {
        '.gitignore': this.getGitignoreContent(),
        'README.md': this.getReadmeTemplate()
      }
    };

    switch (projectType) {
      case ProjectType.WEBAPP:
        return {
          directories: [...baseStructure.directories, 'public', 'src/components', 'src/pages', 'src/styles'],
          files: baseStructure.files
        };
      case ProjectType.API:
        return {
          directories: [...baseStructure.directories, 'src/routes', 'src/controllers', 'src/models', 'src/middleware'],
          files: baseStructure.files
        };
      case ProjectType.CLI:
        return {
          directories: [...baseStructure.directories, 'src/commands', 'src/utils'],
          files: baseStructure.files
        };
      default:
        return baseStructure;
    }
  }

  private getGitignoreContent(): string {
    return `node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
.idea/`;
  }

  private getReadmeTemplate(): string {
    return `# Project

Generated with R3 (River 3) Scaffold

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
`;
  }
}