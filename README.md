# angular-sandbox

The main app that runs for now is the `angular-tour-of-heroes` app. It is an deeper flavor of the standard Tour of Heroes example available on [angular.io](https://angular.io/docs/ts/latest/tutorial/). It uses Angular 4, and includes examples of CSS stylings using Bootstrap 3.3.7. The main important difference in this example app is the use of `@ngrx/store` to present a standardized and centralized data model to every component.

If you have a main component that calls many subcomponents, and all the subcomponents render views of a collection of data (such as a list of heroes), then you will appreciate the use of `@ngrx/store` to keep all the views consistent. A good read touching on this issue can be found [here](http://blog.angular-university.io/angular-ngrx-store-and-effects-crash-course/).

To run this, I assume you already have Node.js and `npm` installed. Just clone this project:

```
git clone git@github.com:huiguang-liang/angular-sandbox.git;
```

Then, change the directory:

```
cd angular-sandbox/angular-tour-of-heroes;
```

And install the dependencies:

```
npm install;
```

Then simply start the app:
```
npm start;
```
