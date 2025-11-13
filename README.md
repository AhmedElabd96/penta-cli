# @penta-b/cli

A CLI tool to generate templates for Penta-B projects, including plugins, layouts, and more.

## Installation

### Global Installation
```bash
npm install -g @penta-b/cli
```

### Using npx (Recommended)
You don't need to install anything! Just use npx to run the CLI:

```bash
npx @penta-b/cli create plugin my-plugin
```

## Usage

### Create a New Plugin

```bash
npx @penta-b/cli create plugin <plugin-name>
```

**Example:**
```bash
npx @penta-b/cli create plugin my-awesome-plugin
cd my-awesome-plugin
npm install
npm run dev
```

This will:
- Create a new directory with the plugin name
- Copy all template files from `templates/plugins/`
- Replace `${projectName}` with your plugin name
- Show step-by-step progress in the terminal

### Create a New Layout

```bash
npx @penta-b/cli create layout <layout-name>
```

**Example:**
```bash
npx @penta-b/cli create layout my-layout
cd my-layout
npm install
npm run dev
```

Note: Layout templates will be available in a future update. You can add your own layout template to `templates/layouts/`.

## Features

- **Clean Code Architecture**: Modular and maintainable TypeScript codebase
- **Extensible**: Easy to add new commands and templates
- **User-Friendly**: Step-by-step progress indicators with colored output
- **Template Variables**: Automatic replacement of variables like `${projectName}`
- **Type-Safe**: Built with TypeScript for better reliability

## Project Structure

```
penta-cli/
├── bin/
│   └── cli.js              # Binary entry point
├── src/
│   ├── commands/
│   │   └── create.ts       # Create command implementation
│   ├── utils/
│   │   ├── logger.ts       # Console logging utility
│   │   └── template.ts     # Template generation utility
│   └── index.ts            # Main CLI entry point
├── templates/
│   ├── plugins/            # Plugin template files
│   └── layouts/            # Layout template files (coming soon)
└── package.json
```

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link locally for testing:
   ```bash
   npm link
   ```

5. Test the CLI:
   ```bash
   penta-cli create plugin test-plugin
   ```

### Adding New Templates

1. Create a new directory in `templates/` (e.g., `templates/my-template/`)
2. Add your template files with variables like `${projectName}`
3. Add a new command in `src/commands/create.ts`
4. Build and test

### Adding New Commands

1. Create a new file in `src/commands/` (e.g., `migrate.ts`)
2. Register the command in `src/index.ts`
3. Build and test

## Publishing to npm

1. Update version in `package.json`
2. Build the project:
   ```bash
   npm run build
   ```

3. Publish to npm:
   ```bash
   npm publish --access public
   ```

4. Users can now run:
   ```bash
   npx @penta-b/cli create plugin my-plugin
   ```

## Template Variables

The following variables are automatically replaced in template files:

- `${projectName}` - The name of the project being created

Variables are replaced in:
- `.ts`, `.tsx`, `.js`, `.jsx` files
- `.json`, `.md`, `.txt` files
- `.css`, `.scss`, `.html` files
- `.yml`, `.yaml`, `.sh` files
- `.babelrc`, `.npmrc`, `Dockerfile`

Binary files (images, etc.) are copied without modification.

## Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

## License

ISC

## Author

Penta-B Team
