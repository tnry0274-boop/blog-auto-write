
import './blog-post.js';

const form = document.getElementById('blog-post-form');
const postsContainer = document.getElementById('blog-posts-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const blogPost = document.createElement('blog-post');
  blogPost.setAttribute('title', title);
  blogPost.setAttribute('content', content);

  postsContainer.appendChild(blogPost);

  form.reset();
});
