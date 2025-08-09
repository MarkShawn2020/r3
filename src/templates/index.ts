import path from 'path';
import fs from 'fs-extra';
import { ProjectType } from '../config';

export interface ProjectTemplate {
  type: ProjectType;
  name: string;
  description: string;
  path: string;
  dependencies: string[];
  devDependencies: string[];
}

export class TemplateRegistry {
  private templates: Map<ProjectType, ProjectTemplate> = new Map();

  constructor() {
    this.registerDefaultTemplates();
  }

  private registerDefaultTemplates(): void {
    const templatesDir = path.join(__dirname, '../../templates');

    this.templates.set(ProjectType.WEBAPP, {
      type: ProjectType.WEBAPP,
      name: 'Web Application',
      description: 'Modern web application with React and Vite',
      path: path.join(templatesDir, 'webapp'),
      dependencies: ['react', 'react-dom'],
      devDependencies: ['vite', '@vitejs/plugin-react', 'typescript']
    });

    this.templates.set(ProjectType.API, {
      type: ProjectType.API,
      name: 'REST API',
      description: 'RESTful API with Express and TypeScript',
      path: path.join(templatesDir, 'api'),
      dependencies: ['express', 'cors', 'dotenv'],
      devDependencies: ['tsx', 'typescript', '@types/express']
    });

    this.templates.set(ProjectType.CLI, {
      type: ProjectType.CLI,
      name: 'CLI Tool',
      description: 'Command-line tool with Commander and TypeScript',
      path: path.join(templatesDir, 'cli'),
      dependencies: ['commander', 'chalk', 'inquirer'],
      devDependencies: ['tsx', 'typescript', '@types/node']
    });

    this.templates.set(ProjectType.FULLSTACK, {
      type: ProjectType.FULLSTACK,
      name: 'Full Stack Application',
      description: 'Full stack application with frontend and backend',
      path: path.join(templatesDir, 'fullstack'),
      dependencies: ['express', 'react', 'react-dom'],
      devDependencies: ['vite', 'typescript', 'concurrently']
    });

    this.templates.set(ProjectType.LIBRARY, {
      type: ProjectType.LIBRARY,
      name: 'NPM Library',
      description: 'Publishable NPM package',
      path: path.join(templatesDir, 'library'),
      dependencies: [],
      devDependencies: ['typescript', 'vitest', 'tsup']
    });

    this.templates.set(ProjectType.MOBILE, {
      type: ProjectType.MOBILE,
      name: 'Mobile Application',
      description: 'React Native mobile application',
      path: path.join(templatesDir, 'mobile'),
      dependencies: ['react', 'react-native'],
      devDependencies: ['typescript', '@types/react-native']
    });

    this.templates.set(ProjectType.DESKTOP, {
      type: ProjectType.DESKTOP,
      name: 'Desktop Application',
      description: 'Electron desktop application',
      path: path.join(templatesDir, 'desktop'),
      dependencies: ['electron'],
      devDependencies: ['typescript', 'electron-builder']
    });
  }

  getTemplate(type: ProjectType): ProjectTemplate | undefined {
    return this.templates.get(type);
  }

  getAllTemplates(): ProjectTemplate[] {
    return Array.from(this.templates.values());
  }

  async copyTemplate(type: ProjectType, destination: string): Promise<void> {
    const template = this.getTemplate(type);
    if (!template) {
      throw new Error(`Template for ${type} not found`);
    }

    if (await fs.pathExists(template.path)) {
      await fs.copy(template.path, destination);
    }
  }

  getTemplateTypes(): ProjectType[] {
    return Array.from(this.templates.keys());
  }
}