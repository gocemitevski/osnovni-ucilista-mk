# Elementary Schools in R. N. Macedonia

Elementary Schools in R. N. Macedonia is an independent project based on a [data.gov.mk dataset](http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta) by the Ministry of Education and Science of the Republic of North Macedonia.

The intention of the project is to visually interpret the official registry of elementary schools in North Macedonia and enable comparison by the number of elementary schools across cities and regions.

The default [data.gov.mk dataset](http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta) has been enriched with geo-spatial coordinates for each school and the available school information have been unified.

[![Build and Deploy](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/deploy.yml/badge.svg)](https://github.com/gocemitevski/osnovni-ucilista-mk/actions/workflows/deploy.yml)

## Dependencies

- Bootstrap v4.6.2
- React v17.0.2
- React Router DOM v5.3.4
- ReactGA4 v2.1.0
- Leaflet v1.6.0
- React Leaflet v2.8.0
- FontAwesome v7.1.0

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is now built with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode with Vite.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page reloads when you make edits. `npm run dev` is an alias for the same command.

### `npm run build`

Builds the app for production to the `build` folder.

The build is minified and the filenames include hashes. Set `GENERATE_SOURCEMAP=true` to emit source maps.

### `npm run build:sitemap`

Builds the sitemap based on the [buildSitemap.js](/src/buildSitemap.js) script. The output is automatically saved to [sitemap.xml](/public/sitemap.xml).

### `npm run format`

Formats the project with Prettier.

## Deployment

Pushing to `master` triggers the [Build and Deploy](/.github/workflows/deploy.yml) GitHub Actions workflow. It installs dependencies with `npm ci`, regenerates the sitemap, builds the app and publishes `build/` to the `gh-pages` branch. The workflow checks out the full git history so the sitemap can use each page's last content change as its `lastmod`.

## Learn More

- [Vite documentation](https://vitejs.dev/guide/)
- [React documentation](https://react.dev/)
