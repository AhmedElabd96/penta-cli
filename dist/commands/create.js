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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCreateCommand = registerCreateCommand;
const path = __importStar(require("path"));
const template_1 = require("../utils/template");
const logger_1 = require("../utils/logger");
/**
 * Create command - handles template generation
 */
function registerCreateCommand(program) {
    const create = program
        .command('create')
        .description('Create a new project from a template');
    // Create plugin command
    create
        .command('plugin <name>')
        .description('Create a new plugin from template')
        .action(async (name) => {
        try {
            logger_1.Logger.header('🚀 Creating new plugin');
            logger_1.Logger.info(`Plugin name: ${name}`);
            const generator = new template_1.TemplateGenerator();
            const targetPath = path.join(process.cwd(), name);
            await generator.generate({
                templateName: 'plugins',
                targetName: name,
                targetPath,
                variables: {
                    projectName: name,
                },
            });
            logger_1.Logger.success(`\nPlugin "${name}" created successfully!`);
            logger_1.Logger.info(`\nNext steps:`);
            logger_1.Logger.step(`cd ${name}`);
            logger_1.Logger.step('npm install');
            logger_1.Logger.step('npm run dev');
        }
        catch (error) {
            logger_1.Logger.error(`Failed to create plugin: ${error.message}`);
            process.exit(1);
        }
    });
    // Create layout command
    create
        .command('layout <name>')
        .description('Create a new layout from template')
        .action(async (name) => {
        try {
            logger_1.Logger.header('🚀 Creating new layout');
            logger_1.Logger.info(`Layout name: ${name}`);
            const generator = new template_1.TemplateGenerator();
            const targetPath = path.join(process.cwd(), name);
            // Check if layout template exists
            const layoutExists = await generator.templateExists('layouts');
            if (!layoutExists) {
                logger_1.Logger.warning('Layout template not found yet.');
                logger_1.Logger.info('The layout template will be available in a future update.');
                logger_1.Logger.info('For now, you can add your layout template to: templates/layouts/');
                process.exit(0);
            }
            await generator.generate({
                templateName: 'layouts',
                targetName: name,
                targetPath,
                variables: {
                    projectName: name,
                },
            });
            logger_1.Logger.success(`\nLayout "${name}" created successfully!`);
            logger_1.Logger.info(`\nNext steps:`);
            logger_1.Logger.step(`cd ${name}`);
            logger_1.Logger.step('npm install');
            logger_1.Logger.step('npm run dev');
        }
        catch (error) {
            logger_1.Logger.error(`Failed to create layout: ${error.message}`);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=create.js.map