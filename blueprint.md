
# Blog Post Generator

## Overview

This application allows users to automatically generate blog posts. It features a simple interface for creating and displaying blog entries.

## Current Features

*   **Blog Post Component:** A web component (`<blog-post>`) for displaying individual blog posts.
*   **Blog Post Form:** A form for creating new blog posts.
*   **Dynamic Post Creation:** New blog posts are dynamically created and added to the page.

## Plan

1.  **Create `blog-post.js`:** Define the `<blog-post>` web component to display a blog post with a title and content.
2.  **Update `index.html`:**
    *   Add a form to the `index.html` file to allow users to input a title and content for a new blog post.
    *   Include a container element where newly created blog posts will be displayed.
    *   Link the `blog-post.js` file.
3.  **Update `main.js`:**
    *   Import the `blog-post.js` module.
    *   Add an event listener to the form to handle the creation of new blog posts.
4.  **Update `style.css`:** Add styling for the blog post form, the blog posts themselves, and the overall layout.
