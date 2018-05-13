"use strict";
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

helper.tab = {
  show : function(e) {
    var scrolltotop = true,
      idtoshow = '',
      target = e.target || e.srcElement;
    if (target) {
      if (target.href) {
        e.preventDefault();
        history.replaceState({}, '', target.href);
        scrolltotop = false;
      }
      if (target.dataset && target.dataset.tab) {
        idtoshow = e.target.dataset.tab;
      } else {
        return;
      }
    }
    helper.tab.showByName(idtoshow,target,scrolltotop);
  },

  showByName : function(idtoshow,target,scrollto) {
    var i=0,
      lis = document.getElementById('tablist').getElementsByTagName('a'),
      tabs = document.getElementById('tabcontainer').childNodes,
      eltoshow = document.getElementById(idtoshow);
    for (i=0; i<lis.length; i++) {
      if (lis[i].nodeType===1) {
        helper.class.remove(lis[i],'active');
      }
    }
    for (i=0; i<tabs.length; i++) {
      if(tabs[i].nodeType===1){
        helper.class.add(tabs[i],'hidden');
        helper.class.add(tabs[i],'fadetext');
      }
    }
    helper.class.remove(eltoshow,'hidden');
    window.setTimeout(function(){
      if (scrollto) {window.scrollTo(0,0);}
      helper.class.remove(eltoshow,'fadetext')
    },5);
    helper.class.add(target,'active');
    /* Sonderfall Kontakt/AGB */
    if (idtoshow==='kontakt'){
      helper.class.remove(document.getElementById('agb'),'hidden');
      helper.class.remove(document.getElementById('kontaktformular'),'hidden');
    } else {
      helper.class.add(document.getElementById('agb'),'hidden');
      helper.class.add(document.getElementById('kontaktformular'),'hidden');
    }
    helper.track.pageview(idtoshow);
  }
}

helper.track = {
  pageview : function(pageid) {
    console.log('helper.track.pageview('+pageid+')');
    if (window._paq) {
      var fragId = pageid || window.location.hash.substr(1);
      console.log('ready to track fragId:'+fragId+' to piwik');
      console.log('_paq:'); console.log(window._paq);
      window._paq.push(['setGenerationTimeMs', 0]);
      window._paq.push(['setCustomUrl', '/' + fragId]);
      window._paq.push(['setDocumentTitle', fragId]);
      window._paq.push(['trackPageView']);
    }
  },
  init: function() {
    console.log('piwik init');
    window._paq = window._paq || [];
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
    (function() {
      var u="//piwik.kleiderordnung-duesseldorf.de/";
      window._paq.push(['setTrackerUrl', u+'js/']);
      window._paq.push(['setSiteId', '1']);
      console.log('_paq initialized:'); console.log(window._paq);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('body')[0];
      g.type='text/javascript'; g.src=u+'js/'; s.parentNode.insertBefore(g,s);
      console.log('created script:'); console.log(g);
      d.head.appendChild(g);
      console.log('appended script');
    })();
  }
}


helper.form = {
  validate : function(e) {
    /* TODO assure required fields or return false */
    return true;
  },
  ajaxPost : function(form, callback) {
    var url = form.action,
      xhr = new XMLHttpRequest();

    /* only allow known form fields */
    var params=''+
      'Name='+encodeURIComponent(document.getElementById('Name').value)+
      '&E-Mail='+encodeURIComponent(document.getElementById('E-Mail').value)+
      '&Telefon='+encodeURIComponent(document.getElementById('Telefon').value)+
      '&Nachricht='+encodeURIComponent(document.getElementById('Nachricht').value)+
      '&captcha='+encodeURIComponent(document.getElementById('captchafield').value);
    if(document.referrer){params+='Referrer='+encodeURIComponent(document.referrer)}
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");

    //.bind ensures that this inside of the function is the XHR object.
    xhr.onload = callback.bind(xhr);

    //All preperations are clear, send the request!
    xhr.send(params);
  }
}

/* attach link handlers for nice tab navigation effect */
/* TODO wirklich barrierefrei sollte der Tabbereich initial ausgeklappt sein
 und dann erst mit modernem JavaScript die Event Handler und initial hidden Styles bekommen */
/* TODO Redundanzen beseitigen und häufig verwendete Elemente / IDs dauerhaft speichern */
helper.event.ready(function(){
  /* Ankernavigation berücksichtigen d.h. z.B. /#kontakt muss Reiter Kontakt öffnen */
  if (location.hash && location.hash!=""){
    var scrollto = true;
    var tab = location.hash.substr(1);
    /* AGB befinden sich auch im Reiter Kontakt */
    if (tab==='agb'){tab='kontakt';scrollto=false;}
    var target = document.getElementById("link-"+tab);
    if (target) {
      helper.tab.showByName(tab,target,scrollto);
    }
  }
  helper.event.addListener(document.getElementById('tablist'),'click',helper.tab.show);
  /* Handler für Links zu Impressum / Kontakt / AGB außerhalb der Tablinks */
  helper.event.addListener(document.getElementById('showcontact'),'click',function(e){
      var scrollto = true;
      var caller = e.target || e.srcElement;
      if (caller && caller.getAttribute('href')==='#agb') {scrollto=false;}
      var target = document.getElementById("link-kontakt");
      if (target) {
        helper.tab.showByName("kontakt",target,scrollto);
      }
    }
  );

  var contactform = document.getElementById('kontaktformular');
  /* submit by AJAX - TODO just leave default for elderly browsers */
  contactform.onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('form-referrer').value=document.referrer;
    helper.form.ajaxPost(contactform,function(xhr){
        if (xhr) {/* TODO properly check success */
          helper.class.remove(document.getElementById('formularversandt'), 'hidden');
          helper.class.add(document.getElementById('formularfelder'), 'hidden');
        }
      }
    );
  };

  /* TODO make available offline as a progressive web app
   https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/
   */
});
