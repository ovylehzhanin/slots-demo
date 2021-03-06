import { Screen } from './Screen.js';
import { formatMarkup } from './utils.js'
const { _$, APP_GLOBALS: { CONSTANTS } } = window;

export class LoginScreen extends Screen {
  constructor(rootSelector, templateSelector) {
    super(rootSelector, templateSelector);
    this.getUserDom = this.getUserDom.bind(this);
  }

  get $addUserButton() {
    return _$id('addUser');
  }

  get $userTemplate() {
    return _$id('tmp.UserTemplate').content.cloneNode(true);
  }

  get $usersList() {
    return this.$dom.querySelector('.users-list');
  }

  getUserDom(user) {
    const templateDOM = this.$userTemplate.firstElementChild;
    return formatMarkup(templateDOM, {
      'userId': user.userId,
      'name': user.name,
      'avatar': `assets/img/${user.avatar}`
    });
  }

  renderUsers(usersList) {
    if (usersList) {
      const fragment = document.createDocumentFragment();
      const $usersList = this.$usersList;
      const $addUserButton = this.$addUserButton;

      usersList.forEach(user => {
        fragment.appendChild(this.getUserDom(user));
      });

      $usersList.insertBefore(fragment, $addUserButton);
    }
  }

  appendUser(userData) {
    this.$usersList.insertBefore(
      this.getUserDom(userData),
      this.$addUserButton
    );
  }

  bindEvents() {
    this.$addUserButton._on('click', () => {
      let nameSet = false;
      let promptText = 'Enter username';
      let result = CONSTANTS.EMPTY_STRING;

      while(!nameSet) {
        result = prompt(promptText, CONSTANTS.EMPTY_STRING);
        if (result == null) {
          nameSet = true;
        } else if (result === CONSTANTS.EMPTY_STRING) {
          console.log('please set corrent name');
          promptText += '\n⚠️ Error: field should not be empty';
          nameSet = false;
        } else {
          result = result.trim();
          nameSet = true;
        }
      }

      /* handle userId generate */
      if (result && nameSet) {
        this.appendUser({
          userId: 2001,
          name: result,
          avatar: 'avatar_default.png'
        })
      }
    });

    this.$usersList._on('click', ({ target })=> {
      if (
        /* TODO: move to constants */
        target.tagName === 'BUTTON' &&
        target.classList.value === 'user-login'
      ) {
        const { id: userId } = target.parentNode.dataset;

        this.$root.dispatchEvent(
          new CustomEvent('request-login', {
            detail: {
              userId
            }
          })
        );
      }
    });
  }

  initDetailsFetch() {
    this.$root.dispatchEvent(new CustomEvent('login-screen-ready'));
  }

  mount() {
    super.mount();
    this.bindEvents();
    this.initDetailsFetch();
  }
}