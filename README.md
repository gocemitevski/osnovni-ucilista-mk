# Elementary Schools in R. N. Macedonia

Elementary Schools in R. N. Macedonia is an independent project based on a [data.gov.mk dataset](http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta) by the Ministry of Education and Science of the Republic of North Macedonia.

The intention of the project is to visually interpret the official registry of elementary schools in North Macedonia and enable comparison by the number of elementary schools across cities and regions.

The default [data.gov.mk dataset](http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta) has been enriched with geo-spatial coordinates for each school and the available school information have been unified.

[![Build and Deploy](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/deploy.yml/badge.svg)](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/deploy.yml) [![CI](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/ci.yml/badge.svg)](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/ci.yml)

## Dependencies

* Bootstrap v4.6.0
* React v16.14.0
* React Router DOM v5.2.0
* ReactGA4 v2.1.0
* Leaflet v1.6.0
* React Leaflet v2.8.0
* FontAwesome v5.15.4

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build:sitemap`

Builds the sitemap based on the [buildSitemap.js](/src/buildSitemap.js) script and prints the output in the console. The output needs to be manually copied over the existing content in [sitemap.xml](/public/sitemap.xml) to be applied.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
