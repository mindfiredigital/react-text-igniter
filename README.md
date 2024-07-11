# HTML Text Editor

A powerful and intuitive HTML text editor built with React.js.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Naming Conventions](#naming-conventions)
- [Contributing](#contributing)

## Features

- Real-time HTML preview
- Real-time JSON preview
- Edit and Insert HTML code
- Table creation and editing
- Layout tools
- Text styling options:
  - Bold
  - Italic
  - Underline
  - Subscript
  - Superscript
- Paragraph alignment (left, center, right)
- List creation (ordered and unordered)
- Image and link insertion
- Responsive design

## Installation

1. Clone the repository:
   ```bash
   https://github.com/deepakyadav-01/Text-Editor
2. Navigate to the project directory:
   ```bash
   cd Text-Editor
3. Install dependencies:
   ```bash
   npm i
4. Start the development server:
   ```bash
  npm start

We follow these naming conventions throughout the project:

- **Component Files:** PascalCase (e.g., `Editor.js`, `Toolbar.js`)
- **Hook Files:** camelCase, prefixed with `use` (e.g., `useEditorFormatting.js`)
- **Context Files:** camelCase (e.g., `editorContext.js`)
- **Utility Files:** camelCase (e.g., `editorUtil.js`)
- **Asset Files:** lowerCamelCase (e.g., `icon.svg`)
- **Style Files:** kebab-case (e.g., `rich-text-editor.css`)

## Contributing

We welcome contributions to improve the HTML Text Editor! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b features/feature-name`
3. Make your changes and commit them: `git commit -m 'feat:Add some feature'`
4. 
We welcome contributions to improve the HTML Text Editor! Please follow these steps:
1. Fork the repository
2. Create a new branch: git checkout -b features\feature-name
3. Make your changes and commit them
4. Structure of commit message :
   ```bash
   feat: A new feature added to the codebase.
   fix: A bug fix.
   docs: Documentation-related changes.
   style: Code style and formatting changes (no functional code changes).
   refactor: Code refactoring without adding new features or fixing bugs.
   test: Adding or modifying tests.
   chore: Routine tasks, maintenance, or tooling changes.
5. Push to the branch: `git push origin features/feature-name`
6. Submit a pull request

Please ensure your code adheres to our naming conventions and coding standards.
