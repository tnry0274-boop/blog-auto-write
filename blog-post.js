
class BlogPost extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'blog-post');

    const title = document.createElement('h2');
    title.textContent = this.getAttribute('title');

    const content = document.createElement('p');
    content.textContent = this.getAttribute('content');

    const style = document.createElement('style');
    style.textContent = `
      .blog-post {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(content);
  }
}

customElements.define('blog-post', BlogPost);
