const postsCRUD = {
  storageKey: 'commentBox',
  get read() {
    const storage = JSON.parse(localStorage.getItem(this.storageKey));
    if (storage === null) {
      this.update = [];
    }

    return storage.posts;
  },
  set update(posts) {
    localStorage.setItem(this.storageKey, JSON.stringify({ posts }));
    renderPosts();
  },
  set create(post) {
    const posts = this.read;
    posts.push({ content: post });

    this.update = posts;
  },
}

function nuke() {
  postsCRUD.update = [];
  renderPosts();
}

function post() {
  const postTextArea = document.getElementById('post-textarea');
  if (!postTextArea) {
    return;
  }

  postsCRUD.create = postTextArea.value;
  postTextArea.value = '';
}

function renderPosts () {
  function renderPost(parent, post) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('postContainer');
    postContainer.innerText = post.content;

    parent.appendChild(postContainer);
  }

  let postsContainer = document.getElementById('posts');
  if (!postsContainer) {
    postsContainer = document.createElement('div')
    postsContainer.id = 'posts';
    document.body.appendChild(postsContainer);
  } else {
    while (postsContainer.firstChild) {
      postsContainer.removeChild(postsContainer.firstChild);
    }
  }

  const posts = postsCRUD.read;
  posts.forEach((post) => {
    renderPost(postsContainer, post);
  });
}


function init() {
  document.getElementById('nuke').addEventListener('click', nuke);
  document.getElementById('post-btn').addEventListener('click', post);

  renderPosts();
}