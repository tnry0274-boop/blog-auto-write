
# Blog Post Generator

## Overview

A modern, framework-less blog writing application that allows users to create, view, and manage blog posts with a polished, vibrant UI. Built with Web Components, LocalStorage for persistence, and modern CSS (Baseline).

## Current Features

*   **Blog Post Component (`<blog-post>`):** Encapsulated custom element for displaying posts.
*   **Persistent Storage:** Posts are saved to `localStorage` and persist across page refreshes.
*   **Modern UI:** Responsive grid layout, elegant typography (expressive font sizes), vibrant colors (OKLCH), and deep shadows.
*   **Post Management:** Ability to create and delete blog posts.
*   **Interactive Design:** Hover effects, glow animations on buttons, and subtle background textures.
*   **AI Auto-Write:** Automatically generates a title and content based on a user-provided topic using a smart template engine.

## Detailed Plan & Steps

1.  **Implement AI Generation Logic (`main.js`):**
    *   Create a `generateContent(topic)` function that maps keywords to high-quality blog templates.
    *   Add a loading state to simulate AI processing.
    *   Integrate the generation logic with the UI.

2.  **Update Interface for AI Writing (`index.html`):**
    *   Add an "AI Topic" input field at the top of the editor.
    *   Add an "Auto-Generate" button with a magic/sparkle icon.

3.  **Style AI Features (`style.css`):**
    *   Design the AI input section with a distinct "AI" feel (gradients, glow).
    *   Add loading animations for the generation process.

4.  **Deployment:**
    *   Commit and push changes to GitHub.
