import validatePackageName from 'validate-npm-package-name';
import fs from 'fs-extra';
import path from 'path';

export class Validator {
  static isValidProjectName(name: string): boolean {
    const validation = validatePackageName(name);
    return validation.validForNewPackages;
  }

  static getProjectNameErrors(name: string): string[] {
    const validation = validatePackageName(name);
    const errors: string[] = [];
    
    if (validation.errors) {
      errors.push(...validation.errors);
    }
    
    if (validation.warnings) {
      errors.push(...validation.warnings);
    }
    
    return errors;
  }

  static async isEmptyDirectory(dirPath: string): Promise<boolean> {
    if (!await fs.pathExists(dirPath)) {
      return true;
    }
    
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidPath(inputPath: string): boolean {
    try {
      path.parse(inputPath);
      return true;
    } catch {
      return false;
    }
  }
}