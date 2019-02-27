# PANWAFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).



(w) = worker
(m) = moderator
(a) = admin
Seitenmap:
NavMenu
    PANWA             Name, Login/Logut

NavMenu-Side
Dashboard
(w,m) Meine Fililaen (a) Fililaen
(w,m) Urlaub beantragen (m,a) Urlaubs
(w,m) Karnkschreibung vormerken (m,a) Karnkschreibungen
(a) Benutzer

Dashboard
    (w,m) liste nächster sichten 
    (m,a) liste leere sichten in den nächsten 2 wochen
    (a) List with Urlaub, kk

Hompage = LoginPage     
    -> Login 
        Succesfull -> Dashboard
        Fail -> try again
    -> Forgot Password 
        Auth Controler - Forgot Password, send mail with link.

(w,m) Meine Fililaen
    Longerich
        Allgemeine infos 
        wochen ansicht
            -> sichten eintragen
            -> sichitwächsel beantragen
            (m)-> worker von einer sichtit löschen
            (m)-> worker andern
        Gerade im urlab    
(a) Fililaen
    -> Filiale anlegen
        Filialen erstellung
    Longerich
        Allgemeine infos 
        -> Allgemeine infos bearbeiten
        wochen ansicht
        -> worker andern löschen

(w,m) Urlaub
    -> 2019
        benutze tage, übriege tage, tage insgesamt
        liste der urlaubs
        -> urlaub beantragen
(a) Urlaubs
    -> 2019
        Liste der urlabus ab jetzt

(w,m) Karnkschreibung
    Karnkschreibung vormerken
(a) Karnkschreibungen
    worker die jetzt krankgeschriben sind

(a) Benutzer
    Pawel
        Liste krankgeschriben / Urlaubs
        Nachste sichten
        Wechselliste
        Notizen
        Vorvalle
        Rolen
        