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
    posts.push({ content: post, replies: [] });

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

function reply(postId) {
  return function () {
    const posts = postsCRUD.read;

    postsCRUD.update = posts.map((post, id) => {
      if (postId !== id) return post;

      const replies = [...post.replies, { content: 'this is a comment on post' }]
      return {...post, replies };
    })
  }
}

function renderReplies(parent, replies) {
  replies.forEach((reply) => {
    const replyContainer = document.createElement('div');
    replyContainer.innerText = reply.content;
    parent.appendChild(replyContainer);
  })
}

function renderPost(parent, post, id) {
  const postContainer = document.createElement('div');
  postContainer.classList.add('postContainer');

  const postContent = document.createElement('div');
  postContent.innerText = post.content;
  postContent.classList.add('postContent');
  postContainer.appendChild(postContent);

  const replyBtn = document.createElement('button');
  replyBtn.classList.add('replyBtn');
  replyBtn.innerText = 'Reply';
  replyBtn.addEventListener('click', reply(id));
  postContainer.appendChild(replyBtn);

  const repliesContainer = document.createElement('div');
  repliesContainer.classList.add('replies');
  renderReplies(repliesContainer, post.replies);
  postContainer.appendChild(repliesContainer);

  parent.appendChild(postContainer);
}

function renderPosts () {
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
  posts.forEach((post, index) => {
    renderPost(postsContainer, post, index);
  });
}


function init() {
  document.getElementById('nuke').addEventListener('click', nuke);
  document.getElementById('post-btn').addEventListener('click', post);

  renderPosts();
}