# Introduction

This project is based on [Angular Electron][angular-electron].

## Getting Started

Install Angular CLI:

``` bash
npm install -g @angular/cli
```

Clone this repository locally:

``` bash
git clone https://github.com/jpnauta/wedding-quiz-game
```

Install dependencies with npm:

``` bash
npm install
```

## NPM Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

## Angular Commands

```
|Command|Description|
|--|--|
|`ng generate component components/example`| Create a service called "ExampleComponent" |
|`ng generate directive directives/example`| Create a service called "ExampleDirective" |
|`ng generate service services/example`| Create a service called "ExampleService" |
```

[angular-electron]: https://github.com/maximegris/angular-electron
