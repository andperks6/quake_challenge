# Earthquake Magnitude Template Application

## Usage

This application is written in [TypeScript](http://www.typescriptlang.org/) and utilizes the [`vite`](https://vitejs.dev/).

The template was written using publicly available layer sources

For other sources you will need to create an [API Key](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/#api-keys) using a free [ArcGIS Developer Account](https://developers.arcgis.com/sign-up/).

Add your API Key to a `.env` file at the root of this project.

```
VITE_API_KEY=MY-DEVELOPER-API-KEY
```

Vite will pick up the API Key for use in your application.

Run the application in development mode with a local development server.
```sh
npm start
```
Build the application for deployment.
```sh
npm run build
```