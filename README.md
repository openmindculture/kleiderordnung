# Kleiderordnung-Duesseldorf.de

Small business website as a responsive single page application.
Images and original CI by Vivien Kruggel.
Web development by Ingo Steinke.

## SCREENSHOTS

### intro, large screen

![Screenshot intro on broad landscape screen](material/screenshot-broad-landscape.jpg)

### gallery page, laptop

![Screenshot mobile (emulated Galaxy S5)](material/screenshot-mobile.jpg)

### gallery page, mobile

![Screenshot gallery page](material/screenshot-gallery.jpg)

## DOMAINS

http://www.kleiderordnung-duesseldorf.de/

https://www.kleiderordnung-duesseldorf.de/piwik/ (statistics)

## DEPENDENCIES

### Development
* yarn or npm to build project

### Production
* Apache webserver (HTTP header settings in .htaccess)
* PHP (with email service, to send contact form)
* Piwik analytics installed at www.kleiderordnung-duesseldorf.de/piwik

## BUILD TARGETS

* **yarn run lint** run all syntax checks
  * **npm run lint-scripts** check script syntax only (JavaScript / ES6)
  * **npm run lint-styles**  check styles syntax only (CSS 3 / SASS)
* **yarn run build** create scripts and styles for deployment

## PROJECT PLANNING

[trello.com/b/iqD5Vfns/kleiderordnung-website](https://trello.com/b/iqD5Vfns/kleiderordnung-website)
