{
  "name": "{{projectName}}",
  "version": "{{projectVersion}}",
  "description": "{{description}}",
  "author": "{{author}}",
  "license": "{{license}}",
  "bin": {
    "{{projectName}}": "./dist/index.js"
  },
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "dependencies": {
    "commander": "^11.0.0",
    "chalk": "^5.3.0",
    "inquirer": "^9.0.0"
  },
  "devDependencies": {
    "@types/inquirer": "^9.0.0",
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}