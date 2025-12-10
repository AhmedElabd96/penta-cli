# @penta-b/penta-cli

A CLI tool to generate templates for Penta-B projects, including plugins, layouts, and more.

## Installation

### Global Installation from Git Repository
```bash
npm i git+https://jenkins.penta-b.net/pentabdev/penta-cli.git -g
```

### Using npx (Recommended)
After installing globally, use npx to run the CLI:

```bash
npx @penta-cli create plugin my-plugin
```

## Usage

### Create a New Plugin

```bash
npx @penta-cli create plugin <plugin-name>
```

**Example:**
```bash
npx @penta-cli create plugin my-awesome-plugin
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
npx @penta-cli create layout <layout-name>
```

**Example:**
```bash
npx @penta-cli create layout my-layout
cd my-layout
npm install
npm run dev
```


## Author

Penta-B Team
