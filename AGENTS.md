# Project overview

This is a Next.js app that uses PostgreSQL for the database and shadcn/ui for the UI components.

# Conventions

- Use `bun` to run scripts and install dependencies, as a bun.lock file is present. Do not use any other package manager.
- When importing React, do not import the entire library, e.g. `import * as React from "react"`, but instead only import what's necessary.

# Creating new features

- When creating new React components for a certain feature, create a folder specific to that feature in the `components` folder.
  - When new hooks are also created, create a `hooks` folder inside that folder for the feature.
  - For views, or a wrapper for many components of the feature, store them in the root of the feature's folder.
  - For components, store them inside another `components` folder inside the feature's folder.
- For other files, it's recommended to create a folder specific to that feature in the `lib` folder.
