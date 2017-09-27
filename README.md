# Kleiderordnung-Duesseldorf.de



Small business website as a responsive single page application.
Images and original CI by Vivien Kruggel.
Web development by Ingo Steinke.

## DOMAINS

`http://www.kleiderordnung-duesseldorf.de/` (production: master branch)

`http://qa.kleiderordnung-duesseldorf.de/` (preview: dev branch)

`http://piwik.kleiderordnung-duesseldorf.de/` (statistics)

## DEPENDENCIES

### Development
* npm (yarn) to build project

### Production
* Apache webserver (HTTP header settings in .htaccess)
* PHP (with email service, to send contact form)
* Piwik analytics installed at piwik.kleiderordnung-duesseldorf.de


## BUILD TARGETS

* **npm lint** run all syntax checks
* **npm lint-scripts** check script syntax only (JavaScript / ES6)
* **npm lint-styles**  check styles syntax only (CSS 3 / SASS)
