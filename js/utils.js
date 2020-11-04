"use strict";
const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
const LEFT_MOUSE_BUTTON_CODE = 0;

(function () {
  window.utils = {
    isKeyBoargEvent(evt) {
      return evt instanceof KeyboardEvent;
    },
    isEnterPressed(evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed(evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isLeftMousePressed(evt) {
      return evt.button === LEFT_MOUSE_BUTTON_CODE;
    }
  };
})();
