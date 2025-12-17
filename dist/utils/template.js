"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateGenerator = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const ora_1 = __importDefault(require("ora"));
const logger_1 = require("./logger");
/**
 * Template utility for copying and processing template files
 */
class TemplateGenerator {
    constructor() {
        // Templates are located relative to the dist folder after build
        this.templatesDir = path.join(__dirname, '../../templates');
    }
    /**
     * Check if template exists
     */
    async templateExists(templateName) {
        const templatePath = path.join(this.templatesDir, templateName);
        return fs.pathExists(templatePath);
    }
    /**
     * Generate a project from template
     */
    async generate(options) {
        const { templateName, targetName, targetPath, variables = {} } = options;
        const spinner = (0, ora_1.default)('Generating project from template...').start();
        try {
            // Verify template exists
            const templatePath = path.join(this.templatesDir, templateName);
            const exists = await fs.pathExists(templatePath);
            if (!exists) {
                spinner.fail(`Template "${templateName}" not found`);
                throw new Error(`Template "${templateName}" does not exist`);
            }
            // Check if target directory already exists
            if (await fs.pathExists(targetPath)) {
                spinner.fail(`Directory "${targetName}" already exists`);
                throw new Error(`Directory "${targetName}" already exists`);
            }
            spinner.text = 'Creating project directory...';
            await fs.ensureDir(targetPath);
            logger_1.Logger.step(`Created directory: ${targetName}`);
            // Copy template files
            spinner.text = 'Copying template files...';
            await this.copyTemplate(templatePath, targetPath, variables);
            spinner.succeed('Template generated successfully!');
        }
        catch (error) {
            spinner.fail('Failed to generate template');
            throw error;
        }
    }
    /**
     * Recursively copy template files and replace variables
     */
    async copyTemplate(sourcePath, targetPath, variables) {
        const entries = await fs.readdir(sourcePath, { withFileTypes: true });
        for (const entry of entries) {
            const sourceFile = path.join(sourcePath, entry.name);
            const targetFile = path.join(targetPath, entry.name);
            if (entry.isDirectory()) {
                // Recursively copy directories
                await fs.ensureDir(targetFile);
                logger_1.Logger.step(`Created directory: ${path.relative(targetPath, targetFile)}`);
                await this.copyTemplate(sourceFile, targetFile, variables);
            }
            else {
                // Copy and process file
                await this.copyAndProcessFile(sourceFile, targetFile, variables);
                logger_1.Logger.step(`Created file: ${path.relative(targetPath, targetFile)}`);
            }
        }
    }
    /**
     * Copy a file and replace template variables
     */
    async copyAndProcessFile(sourcePath, targetPath, variables) {
        const ext = path.extname(sourcePath);
        // Text-based files that should be processed
        const processableExtensions = [
            '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt',
            '.css', '.scss', '.sass', '.html', '.xml', '.yml', '.yaml',
            '.sh', '.dockerfile', '.npmrc', '.babelrc'
        ];
        const isProcessable = processableExtensions.includes(ext.toLowerCase()) ||
            ['.babelrc', '.npmrc', 'Dockerfile'].includes(path.basename(sourcePath));
        if (isProcessable) {
            // Read file as text and replace variables
            let content = await fs.readFile(sourcePath, 'utf-8');
            // Replace all variables in the format ${variableName}
            for (const [key, value] of Object.entries(variables)) {
                const pattern = new RegExp(`\\$\\{${key}\\}`, 'g');
                content = content.replace(pattern, value);
            }
            await fs.writeFile(targetPath, content, 'utf-8');
        }
        else {
            // Binary files, just copy
            await fs.copy(sourcePath, targetPath);
        }
    }
}
exports.TemplateGenerator = TemplateGenerator;
//# sourceMappingURL=template.js.map