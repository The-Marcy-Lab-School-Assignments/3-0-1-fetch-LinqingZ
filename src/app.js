import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';

export default function app(appDiv) {
  let parentEls = setupPageBasics(appDiv);
  // { statusDiv, usersUl, postsUl, newUserForm, newUserDiv };

  checkResponseStatus()
  .then((response) => {
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    renderStatus(parentEls.statusDiv, response);
    return getUsers();
  })
  .then((users) => {
    renderUsers(parentEls.usersUl, users);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  parentEls.usersUl.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
      const userId = event.target.dataset.userId;
      getUserPosts(userId)
        .then((posts) => {
          renderPosts(parentEls.postsUl, posts);
        });
    }
  });

  parentEls.newUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(parentEls.newUserForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const newUserData = { username, email };
    createNewUser(newUserData)
      .then((newUser) => {
        // console.log(newUser)
        
        renderNewUser(parentEls.newUserDiv, newUser);
        parentEls.newUserForm.reset();
      }).catch((error) => {
        console.error('Error:', error);
  });
  });
}