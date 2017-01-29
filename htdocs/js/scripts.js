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

helper.showTab = function(e) {
	var idtoshow = '';
  var target = e.target || e.srcElement;
	if (target && target.dataset && target.dataset.tab) {
	  idtoshow = e.target.dataset.tab;console.log("to show: "+idtoshow);
	} else {
	  return;
	}

  helper.showNamedTab(idtoshow,target);
}

helper.showNamedTab = function(idtoshow,target) {
  var i=0, lis = document.getElementById('tablist').getElementsByTagName('a');
  for (i=0; i<lis.length; i++) {
    if (lis[i].nodeType===1) {
      helper.class.remove(lis[i],'active');
    }
  }

  var tabs = document.getElementById('tabcontainer').childNodes;
  for (i=0; i<tabs.length; i++) {
    if(tabs[i].nodeType===1){
      helper.class.add(tabs[i],'hidden');
      helper.class.add(tabs[i],'fadetext');
    }
  }
  var eltoshow = document.getElementById(idtoshow)
  helper.class.remove(eltoshow,'hidden');
  window.setTimeout(function(){window.scrollTo(0,0);helper.class.remove(eltoshow,'fadetext')},5);
  helper.class.add(target,'active');
}

/* attach link handlers for nice tab navigation effect */
/* TODO wirklich barrierefrei sollte der Tabbereich initial ausgeklappt sein
   und dann erst mit modernem JavaScript die Event Handler und initial hidden Styles bekommen */
/* TODO Redundanzen beseitigen und häufig verwendete Elemente / IDs dauerhaft speichern */
helper.event.ready(function(){
  /* Ankernavigation berücksichtigen d.h. z.B. /#kontakt muss Reiter Kontakt öffnen */
  if (location.hash && location.hash!=""){
    console.log("evaluate location.hash "+location.hash);
    var tab = location.hash.substr(1);
    var target = document.getElementById("link-"+tab);
    if (target) {
      helper.showNamedTab(tab,target);
    }
  }
  document.getElementById('tablist').addEventListener('click',helper.showTab);
  /* TODO make available offline as a progressive web app
  	https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/
  	*/
});
