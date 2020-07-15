# Scope
> Scope exists to make this country a place where disabled people have the same opportunities as everyone else. Until then, we’ll be here. We provide support, information and advice to more than a quarter of a million disabled people and their families every year. We raise awareness of the issues that matter. And with your support, we'll keep driving change across society until this country is great for everyone.

## Index
- [Philosophy & Targets](#philosophy--targets)
- [Technologies employed](#technologies-employed)
- [Running the application & other NPM scripts](#running-the-application--other-npm-scripts)
- [Project philosophy](#project-philosophy)

&nbsp;
## Philosophy & Targets

In a few words:

> It's all about user experience - William Iehl

The project is a content website browsed both by disabled and non-disabled users from all over the UK, 67% of which are on mobile devices. Everything from load speed to interaction is part of user experience and should be as seamless as possible in any scenario (e.g. Navigation dropdowns can be closed with the <ESC> key or clicking on the body).

#### Contacts
- [James Deeley](mailto:james@aqueduct.co.uk) - Chief experience officer
- [Ryan Connaughton](mailto:ryan@aqueduct.co.uk) - UX
- [Alex Castiglioni](mailto:alexc@aqueduct.co.uk) - Designer
- [William Iehl](mailto:www.iehl@gmail.com) - Front-end

#### Tools

- `WCAG Contrast checker` is a chrome extension to get contrast ratios
- `NVDA` is a popular open source screen reader.
- `TalkBack` is android's builtin screen reader.
- `VoiceOver` is iOS' builtin screen reader.

&nbsp;
## Technologies employed
This project uses the following technologies:

#### Languages & preprocessor
- [Handlebars](https://handlebarsjs.com/)
- [Scss](https://sass-lang.com/)
- Vanilla JS (ES6+)

#### Build tools
- [Nodemon](https://nodemon.io/)
- [Webpack](https://webpack.js.org/)
- [NPM scripts](https://docs.npmjs.com/misc/scripts)
- [Webpack bundle analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

#### Linters
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)

&nbsp;
## Running the application & other NPM scripts
In the root of the site run:

#### `$ npm install`
Runs the install of the dependencies and trigger `npm start`

#### `$ npm start`
Runs `nodemon` watch on the build files (allowing us to modify the files or install packages without having to stop the dev environment) and starts `webpack-dev-server` in development mode and open your browser to [localhost:9000](http://localhost:9000)

#### `$ npm run build`
Builds the project in development mode and render the files in `dist/`

#### `$ npm run build:static` *Is that really useful?*
Runs `npm run build` and copy the file to `dist_static/`

#### `$ npm run build:prod`
Runs webpack in production mode and copy the files from `dist/` to `../Foundation/Presentation/code/`

#### `$ npm run build:prod:analyzer`
Runs `npm run build:prod` with `webpack-bundle-analyzer` enabled

&nbsp;
## Project philosophy
For this project we wanted to emulate as much as possible the structure of `create-react-app`. Namely we wanted the following:
- Self contained module
- Ability to call a component with different data
- Reusable layouts

### Self contained module
Each module has it's own folder in `components/` and should contain all the files it needs to work. 

### Data
The data file for each component is dynamically fetched using a custom helper in [fetchData.js](/src/Frontend/src/helpers/fetchData.js). Passing data down to a partial is done like so:
```handlebars
{{#fetchData 'ModuleFolder/DataFileName'}}
   {{> ModuleFolder/ModuleFileName}}
{{/fetchData}}
```
### Layouts
We make use of the block partials and inline partials to create a reusable layout. You can read more about these on the [official partials documentation](http://handlebarsjs.com/partials.html).
The layout is defined like this:
```handlebars
<!doctype html>
<html lang="en">
   <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <link rel="stylesheet" href="css/main.css" />
      <title>{{#if title}}{{title}}{{/if}}</title>
   </head>
   <body>
     {{#> navigation}} {{!-- navigation block partial definition --}}
        {{!-- Default navigation can go here --}}
     {{/hero}}

     {{#> content}} {{!-- content block partial definition --}}
        {{!-- Default can go here --}}
     {{/content}}

     {{#> footer}} {{!-- footer block partial definition --}}
        {{!-- Default footer can go here --}}
     {{/footer}}
   </body>
</html>
```
And it is used like so:
```handlebars
{{#> layoutName title="someTitle"}}
   {{#*inline "content"}}
      {{!-- Content goes here --}}
   {{/inline}}
{{/layoutName}}
```
The layout will then look for the inline partials that are defined in the page and populate its block partials with it. If it does not find the corresponding inline partial it will use its default content if provided. This allows layouts to have an easily overwritable default behaviour making them extremely flexible.

