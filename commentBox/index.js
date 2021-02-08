const crud = {
  storageKey: 'commentBox',
  get posts() {
    const storage = JSON.parse(localStorage.getItem(this.storageKey));
    if (storage === null) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }
}

function nuke() {
  localStorage.setItem(crud.storageKey, JSON.stringify({}));
}

function init() {
  document.getElementById('nuke').addEventListener('click', nuke);
}