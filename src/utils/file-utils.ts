import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

export class FileUtils {
  static async copyDirectory(src: string, dest: string, filter?: (src: string) => boolean): Promise<void> {
    await fs.copy(src, dest, { filter });
  }

  static async readJson<T = any>(filePath: string): Promise<T> {
    return await fs.readJson(filePath);
  }

  static async writeJson(filePath: string, data: any, options?: fs.WriteOptions): Promise<void> {
    await fs.writeJson(filePath, data, { spaces: 2, ...options });
  }

  static async ensureFile(filePath: string): Promise<void> {
    await fs.ensureFile(filePath);
  }

  static async getFileHash(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  static async findFiles(dir: string, pattern: RegExp): Promise<string[]> {
    const files: string[] = [];
    
    async function traverse(currentDir: string): Promise<void> {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory()) {
          await traverse(fullPath);
        } else if (pattern.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    
    await traverse(dir);
    return files;
  }

  static async getDirectorySize(dirPath: string): Promise<number> {
    let size = 0;
    
    async function calculateSize(currentPath: string): Promise<void> {
      const stat = await fs.stat(currentPath);
      
      if (stat.isDirectory()) {
        const entries = await fs.readdir(currentPath);
        for (const entry of entries) {
          await calculateSize(path.join(currentPath, entry));
        }
      } else {
        size += stat.size;
      }
    }
    
    await calculateSize(dirPath);
    return size;
  }

  static formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}