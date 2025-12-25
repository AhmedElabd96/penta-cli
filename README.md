# @penta-b/penta-cli

A CLI tool to generate templates for Penta-B projects, including plugins, layouts, and more.

## Installation

Install globally from the git repository:

```bash
npm i https://github.com/AhmedElabd96/penta-cli/tarball/dev -g
```

This will install the `penta-cli` command globally on your system.

## Usage

### Create a New Plugin

```bash
penta-cli create plugin <plugin-name>
```

**Example:**
```bash
penta-cli create plugin my-awesome-plugin
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
penta-cli create layout <layout-name>
```

**Example:**
```bash
penta-cli create layout my-layout
cd my-layout
npm install
npm run dev
```

## Updating

To update to the latest version:

```bash
npm i https://github.com/AhmedElabd96/penta-cli/tarball/dev -g
```

## Author

Penta-B Team
