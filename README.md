# SCREENWISE - Code Directory

# Utilities
This project is a **React** application built with **Vite**, utilizing **TypeScript** for robust code and **Tailwind CSS** for efficient styling. The application's entry point is **index.html**, which loads the main **React** application defined in **src/main.tsx**. The core user interface and application logic reside within the **src/App.tsx** component. Styling is managed through **src/index.css**, which integrates **Tailwind CSS**. Essential project metadata, scripts, and dependencies are configured in **package.json**, while **vite.config.ts** handles the development server and build process, and **tailwind.config.js** customizes the **Tailwind CSS** setup.

# Structure in Detail
  **/ (Root Directory):**

* index.html: This is the main entry point for the web application. It's a simple HTML file that serves as the container for your React app.
* package.json: This file defines the project's metadata, lists all its dependencies (libraries the project needs to run), and specifies scripts for common tasks like starting the development server (dev), building the application (build), and running linters (lint).
* vite.config.ts: This is the configuration file for Vite, the build tool. It tells Vite how to set up the development server, how to build the project for production, and includes plugins like @vitejs/plugin-react for React support.
* tailwind.config.js: This file configures Tailwind CSS. You can customize Tailwind's default theme, add new utility classes, and specify which files Tailwind should scan for its classes.
* postcss.config.js: This configuration file is for PostCSS, which processes your CSS. It's used by Tailwind CSS to add vendor prefixes and other transformations to your styles.
* tsconfig.json, tsconfig.app.json, tsconfig.node.json: These are TypeScript configuration files. They define how the TypeScript compiler should behave, including target JavaScript versions, module resolution strategies, and strictness rules for different parts of the project (e.g., application code vs. Node.js-based build scripts).
* eslint.config.js: This file configures ESLint, a tool that helps maintain code quality and consistency by identifying and reporting on patterns found in JavaScript/TypeScript code.
# 
  **src/ (Source Directory): This is where all the application's source code resides.**

* src/main.tsx: This is the main entry point for your React application. It's responsible for rendering the root React component (App) into the index.html file.
* src/App.tsx: This file contains the main React component for your application. It's where you'll typically define the overall layout, routing, and top-level logic of your user interface.
* src/index.css: This file contains the global CSS styles for your application. It's where you import Tailwind CSS base styles, components, and utilities.
* src/vite-env.d.ts: This is a TypeScript declaration file that provides type definitions for Vite-specific environment variables and features, allowing TypeScript to understand them.
**Other subdirectories within src/ (e.g., components/, utils/, assets/) would typically contain smaller, reusable React components, utility functions, and static assets like images or icons, respectively.**
