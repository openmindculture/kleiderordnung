/* common helper functions */

var helper = {};

helper.class = {
  has: function (element, className) {
    if (!element) {
      return false;
    }

    if (element.classList && typeof element.classList.contains == "function") {
      return element.classList.contains(className);
    }

    if (typeof element.className === "undefined") {
      return false;
    }

    var classes = ' ' + element.className + ' ';
    return classes.indexOf(className) >= 0;
  },

  add: function (element, className) {
    if (!element) {
      return;
    }

    if (element.classList && typeof element.classList.add == "function") {
      element.classList.add(className);
      return;
    }

    if (typeof element.className === "undefined") {
      element.className = className;
      return;
    }
    if (!helper.class.has(element, className)) {
      element.className += ' ' + className;
    }
  },

  remove: function (element, className) {
    if (!element) {
      return;
    }

    if (element.classList && typeof element.classList.remove == "function") {
      element.classList.remove(className);
      return;
    }

    if (typeof element.className === "undefined") {
      return;
    }

    var classes = ' ' + element.className + ' ';
    classes = classes.replace(' ' + className + ' ', ' ');
    element.className = classes.substr(1, classes.length - 2);
  },

  toggle: function (element, className) {
    if (!element) {
      return;
    }

    if (element.classList && typeof element.classList.toggle == "function") {
      element.classList.toggle(className);
      return;
    }

    if (typeof element.className === "undefined") {
      return;
    }

    if (helper.class.has(element, className)) {
      helper.class.remove(element, className);
    } else {
      helper.class.add(element, className);
    }
  }
};

helper.event = {
  addListener: function (element, event, handler) {
    if (!element) {
      return;
    }

    if (element.addEventListener) {
      element.addEventListener(event, handler, false);
      return;
    }

    element.attachEvent('on' + event, handler);
  },

  remove: function ready(element, event, handler) {
    if (!element) {
      return;
    }

    if (element.removeEventListener) {
      element.removeEventListener(event, handler, false);
      return;
    }

    element.detachEvent('on' + event, handler);
  },

  ready: function ready(fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') {
          fn();
        }
      });
    }
  }

};

//* todo schöner, abstrakter schreiben und Links von IDs befreien */
helper.showTab = function(idtoshow,callerelement) {
  helper.class.remove(document.getElementById('link-ueber'),'active');
  helper.class.remove(document.getElementById('link-b'),'active');
  helper.class.remove(document.getElementById('link-leistungen'),'active');
  helper.class.remove(document.getElementById('link-d'),'active');
  helper.class.remove(document.getElementById('link-kontakt'),'active');	
	
  helper.class.add(document.getElementById('ueber-mich'),'hidden');
  helper.class.add(document.getElementById('tab-b'),'hidden');
  helper.class.add(document.getElementById('leistungen'),'hidden');
  helper.class.add(document.getElementById('tab-d'),'hidden');
  helper.class.add(document.getElementById('kontakt'),'hidden');
  
  helper.class.remove(document.getElementById(idtoshow),'hidden');
  helper.class.add(callerelement,'active');
}