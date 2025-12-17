"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
/**
 * Logger utility for consistent CLI output
 */
class Logger {
    static success(message) {
        console.log(chalk_1.default.green('✓'), message);
    }
    static error(message) {
        console.log(chalk_1.default.red('✗'), message);
    }
    static info(message) {
        console.log(chalk_1.default.blue('ℹ'), message);
    }
    static warning(message) {
        console.log(chalk_1.default.yellow('⚠'), message);
    }
    static step(message) {
        console.log(chalk_1.default.cyan('→'), message);
    }
    static header(message) {
        console.log('\n' + chalk_1.default.bold.cyan(message) + '\n');
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map