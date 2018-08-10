# Kleiderordnung-Duesseldorf.de

Small business website as a responsive single page application.
Images and original CI by Vivien Kruggel.
Web development by Ingo Steinke.

## DOMAINS

http://www.kleiderordnung-duesseldorf.de/ (production: master branch)

https://www.kleiderordnung-duesseldorf.de/beta/ (preview: dev branch)

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