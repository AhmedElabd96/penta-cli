export interface TemplateOptions {
    templateName: string;
    targetName: string;
    targetPath: string;
    variables?: Record<string, string>;
}
/**
 * Template utility for copying and processing template files
 */
export declare class TemplateGenerator {
    private templatesDir;
    constructor();
    /**
     * Check if template exists
     */
    templateExists(templateName: string): Promise<boolean>;
    /**
     * Generate a project from template
     */
    generate(options: TemplateOptions): Promise<void>;
    /**
     * Recursively copy template files and replace variables
     */
    private copyTemplate;
    /**
     * Copy a file and replace template variables
     */
    private copyAndProcessFile;
}
//# sourceMappingURL=template.d.ts.map