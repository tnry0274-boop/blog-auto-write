import './blog-post.js';

const form = document.getElementById('blog-post-form');
const postsContainer = document.getElementById('blog-posts-container');

// State management
let posts = JSON.parse(localStorage.getItem('nexus-blog-posts')) || [];

function savePosts() {
  localStorage.setItem('nexus-blog-posts', JSON.stringify(posts));
}

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

function createPostElement(post) {
  const blogPost = document.createElement('blog-post');
  blogPost.setAttribute('id', post.id);
  blogPost.setAttribute('title', post.title);
  blogPost.setAttribute('content', post.content);
  blogPost.setAttribute('date', post.date);
  blogPost.setAttribute('tags', post.tags);
  return blogPost;
}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value;
  const date = new Date().toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    tags,
    date
  };

  posts.unshift(newPost); // Add to beginning
  savePosts();
  
  const postElement = createPostElement(newPost);
  postsContainer.prepend(postElement);

  form.reset();
  
  // Visual feedback
  const button = form.querySelector('button');
  const originalText = button.textContent;
  button.textContent = '발행 완료!';
  button.style.background = 'var(--accent-color)';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
});

// Handle custom delete event from blog-post component
document.addEventListener('delete-post', (e) => {
  const id = e.detail.id;
  posts = posts.filter(post => post.id !== id);
  savePosts();
  
  const elementToDelete = postsContainer.querySelector(`blog-post[id="${id}"]`);
  if (elementToDelete) {
    elementToDelete.style.opacity = '0';
    elementToDelete.style.transform = 'scale(0.9)';
    elementToDelete.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      elementToDelete.remove();
    }, 300);
  }
});

// Initial render
renderPosts();
