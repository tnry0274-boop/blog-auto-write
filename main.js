import './blog-post.js';

const form = document.getElementById('blog-post-form');
const postsContainer = document.getElementById('blog-posts-container');
const aiTopicInput = document.getElementById('ai-topic');
const aiGenerateBtn = document.getElementById('ai-generate-btn');

// State management
let posts = JSON.parse(localStorage.getItem('nexus-blog-posts')) || [];

// AI Templates
const templates = {
  '여행': {
    title: '나만 알고 싶은 숨은 여행지 베스트 3',
    content: '복잡한 도시를 벗어나 진정한 휴식을 취할 수 있는 곳을 찾고 계신가요?\n\n1. 제주도의 숨겨진 오름\n2. 강원도의 조용한 해변 마을\n3. 남해의 보석 같은 섬들\n\n이번 주말, 일상에서 잠시 벗어나 새로운 공기를 마셔보는 건 어떨까요?',
    tags: '여행, 휴식, 힐링'
  },
  '인공지능': {
    title: 'AI가 바꾸는 우리의 미래 일상',
    content: '인공지능 기술은 이제 상상을 넘어 우리 삶의 깊숙한 곳까지 들어와 있습니다.\n\n업무의 효율성을 높여주는 AI 툴부터, 개인 맞춤형 비서까지. 기술의 발전이 가져올 편리함과 우리가 준비해야 할 자세에 대해 이야기해봅니다.',
    tags: 'AI, 기술, 미래'
  },
  '요리': {
    title: '주말 저녁을 특별하게 만드는 15분 레시피',
    content: '바쁜 일상 속에서도 건강하고 맛있는 한 끼를 포기할 수 없죠.\n\n신선한 재료와 최소한의 조리 과정으로 레스토랑 못지않은 풍미를 내는 비법을 공개합니다. 오늘 저녁, 당신의 식탁을 더 풍성하게 만들어보세요.',
    tags: '요리, 레시피, 미식'
  },
  'default': {
    title: (topic) => `${topic}에 대한 새로운 통찰과 기록`,
    content: (topic) => `${topic}은(는) 우리 삶에서 매우 중요한 부분을 차지합니다.\n\n이 주제에 대해 깊이 탐구해보면 예상치 못한 즐거움과 지식을 발견할 수 있습니다. 여러분은 이 주제에 대해 어떻게 생각하시나요? 함께 이야기를 나누어보고 싶습니다.`,
    tags: '생각, 기록, 통찰'
  }
};

async function generateAIContent() {
  const topic = aiTopicInput.value.trim();
  if (!topic) {
    alert('주제를 입력해주세요!');
    return;
  }

  aiGenerateBtn.classList.add('loading');
  const originalContent = aiGenerateBtn.innerHTML;
  aiGenerateBtn.innerHTML = '<span class="icon">⌛</span> 작성 중...';
  aiGenerateBtn.disabled = true;

  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  let generated;
  if (templates[topic]) {
    generated = templates[topic];
  } else {
    generated = {
      title: templates.default.title(topic),
      content: templates.default.content(topic),
      tags: templates.default.tags
    };
  }

  // Fill form
  document.getElementById('title').value = generated.title;
  document.getElementById('content').value = generated.content;
  document.getElementById('tags').value = generated.tags;

  // Reset button
  aiGenerateBtn.classList.remove('loading');
  aiGenerateBtn.innerHTML = originalContent;
  aiGenerateBtn.disabled = false;
  
  // Focus on content for minor edits
  document.getElementById('content').focus();
}

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
  aiTopicInput.value = '';
  
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

aiGenerateBtn.addEventListener('click', generateAIContent);

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
