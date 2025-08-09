import fs from 'fs-extra';
import path from 'path';
import { R3Config } from '../config';

export interface TemplateContext {
  projectName: string;
  projectVersion: string;
  author?: string;
  description?: string;
  license?: string;
  year: number;
  [key: string]: any;
}

export class TemplateEngine {
  private templateCache: Map<string, string> = new Map();

  async processTemplates(projectPath: string, config: R3Config): Promise<void> {
    const context = this.createContext(config);
    await this.processDirectory(projectPath, context);
  }

  private createContext(config: R3Config): TemplateContext {
    return {
      projectName: config.name,
      projectVersion: config.version,
      author: config.author,
      description: config.description,
      license: config.license,
      year: new Date().getFullYear(),
      features: config.features,
      projectType: config.projectType
    };
  }

  private async processDirectory(dirPath: string, context: TemplateContext): Promise<void> {
    const files = await fs.readdir(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await this.processDirectory(filePath, context);
      } else if (this.isTemplateFile(file)) {
        await this.processFile(filePath, context);
      }
    }
  }

  private isTemplateFile(filename: string): boolean {
    const templateExtensions = ['.ejs', '.hbs', '.tpl'];
    return templateExtensions.some(ext => filename.endsWith(ext));
  }

  private async processFile(filePath: string, context: TemplateContext): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const processed = this.renderTemplate(content, context);
    
    const outputPath = filePath.replace(/\.(ejs|hbs|tpl)$/, '');
    await fs.writeFile(outputPath, processed, 'utf-8');
    await fs.remove(filePath);
  }

  private renderTemplate(template: string, context: TemplateContext): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return context[key] || match;
    });
  }

  async loadTemplate(templateName: string): Promise<string> {
    if (this.templateCache.has(templateName)) {
      return this.templateCache.get(templateName)!;
    }

    const templatePath = path.join(__dirname, '../../templates', templateName);
    const content = await fs.readFile(templatePath, 'utf-8');
    this.templateCache.set(templateName, content);
    return content;
  }
}