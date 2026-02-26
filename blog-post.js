class BlogPost extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'content', 'date', 'tags', 'id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  deletePost() {
    const event = new CustomEvent('delete-post', {
      detail: { id: this.getAttribute('id') },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  render() {
    const title = this.getAttribute('title') || 'Untitled';
    const content = this.getAttribute('content') || '';
    const date = this.getAttribute('date') || new Date().toLocaleDateString();
    const tags = this.getAttribute('tags') || '';
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 35px rgba(0,0,0,0.08), 0 10px 15px rgba(0,0,0,0.05);
        }
        .header {
          margin-bottom: 16px;
        }
        .date {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 8px;
          display: block;
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #1a1a1a;
          line-height: 1.3;
        }
        .content {
          font-size: 1rem;
          color: #444;
          line-height: 1.6;
          flex-grow: 1;
          margin-bottom: 20px;
          white-space: pre-wrap;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tag {
          background: oklch(0.96 0.02 260);
          color: oklch(0.4 0.1 260);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #eee;
          padding-top: 16px;
        }
        .delete-btn {
          background: none;
          border: none;
          color: #ff4757;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .delete-btn:hover {
          background: #fff0f0;
        }
      </style>
      <div class="card">
        <div class="header">
          <span class="date">${date}</span>
          <h2>${title}</h2>
        </div>
        <div class="tags">
          ${tagList.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
        <div class="content">${content}</div>
        <div class="actions">
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => this.deletePost());
  }
}

customElements.define('blog-post', BlogPost);
