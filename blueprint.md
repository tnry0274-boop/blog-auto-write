
# Blog Content Generator (Nexus AI)

## Overview

A specialized tool designed to automatically generate high-quality blog titles and content based on a single topic. The focus is on providing a seamless experience where users can generate content and instantly copy it for use elsewhere.

## Core Features

*   **Topic-Based Generation:** Users input a topic, and the AI (template engine) generates a structured blog post.
*   **One-Click Copy:** Dedicated buttons to copy the title and the full content to the clipboard.
*   **Distraction-Free UI:** A clean, focused interface centered around the generation process.
*   **Live Preview:** Instantly see the generated result in a polished format.
*   **No Database/Publishing:** Removed local storage and publishing features to focus purely on content creation and export.

## Detailed Plan & Steps

1.  **Redesign UI for Generation (`index.html`):**
    *   Center the UI around the topic input.
    *   Create a "Result Area" that displays the generated Title, Content, and Tags.
    *   Add "Copy Title" and "Copy Content" buttons.
    *   Remove the "Publish" button and the "Recent Stories" list.

2.  **Enhance Visual Style (`style.css`):**
    *   Make the generated content area look like a professional editor/preview.
    *   Style the Copy buttons with clear visual feedback (success states).
    *   Maintain the modern OKLCH color palette and glassmorphism effects.

3.  **Update Core Logic (`main.js`):**
    *   Remove all `localStorage` and post-listing code.
    *   Improve the content generation logic with more comprehensive templates.
    *   Implement the Clipboard API for copying text.
    *   Add a "Reset" or "Start Over" function.

4.  **Cleanup:**
    *   Remove unused components or files (like the old blog-post list logic).

5.  **Deployment:**
    *   Commit and push the overhauled version to GitHub.
