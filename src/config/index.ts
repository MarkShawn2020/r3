import path from 'path';
import os from 'os';

export interface R3Config {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  projectType: ProjectType;
  features: Feature[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export enum ProjectType {
  WEBAPP = 'webapp',
  API = 'api',
  FULLSTACK = 'fullstack',
  CLI = 'cli',
  LIBRARY = 'library',
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

export interface Feature {
  name: string;
  description: string;
  enabled: boolean;
  dependencies?: string[];
}

export const DEFAULT_CONFIG: Partial<R3Config> = {
  version: '0.1.0',
  license: 'MIT',
  projectType: ProjectType.WEBAPP,
  features: []
};

export const R3_HOME = path.join(os.homedir(), '.r3');
export const TEMPLATES_DIR = path.join(R3_HOME, 'templates');
export const CONFIG_FILE = 'r3.config.json';