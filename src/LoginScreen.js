import { Screen } from './Screen.js';
const { _$, APP_GLOBALS: { CONSTANTS } } = window;

export class LoginScreen extends Screen {
  constructor(rootSelector, templateSelector) {
    super(rootSelector, templateSelector);
  }

  get $addUserButton() {
    return _$id('addUser');
  }

  bindEvents() {
    console.log(this.$root);
    console.log(this.$dom);
    console.log(this.$addUserButton);
    this.$addUserButton._on('click', () => {
      let nameSet = false;
      const initialResult = CONSTANTS.EMPTY_STRING;
      let promptText = 'Enter username';

      while(!nameSet) {
        const result = prompt(promptText, initialResult).trim();
        console.log(result);
        if (result == null) {
          nameSet = true; 
        } else if (result === initialResult) {
          console.log('please set corrent name');
          promptText += '\nError: field should not be empty';
          nameSet = false;
        } else {
          console.log(result);
          nameSet = true;
        }
      }
    });
  }
  mount() {
    super.mount();
    this.bindEvents();
  }
}