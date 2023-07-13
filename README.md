# Contentful URL Manager

The Contentful URL Manager App is a simple [Contentful App](https://www.contentful.com/developers/docs/extensibility/app-framework/) that provides a way to create a system for generating dynamic URL paths with a tree structure. Additionally, the application allows you to store multiple paths in the same content and utilize them as needed.

![Contentful URL Manager](./docs/showcase-image.png)

*Example of a content that has as parent another content with path `/contentful-url-manager` and this in turn does not have a parent and two extra paths*

## Use Cases

Create paths with depth defined by a hierarchy system of parent and child contents; e.g.:

* `/`: Root content without parents.
* `/parent1/child`: Content under one hierarchical parent.
* `/parent1/child/another-child`: Content under two hierarchical parents.

Create multiple paths in the same content to handle multiple URLs to the same content; e.g.:

* Content to manage the information on a contact page, you can have two paths, such as, `/contact` and `/contact-us`. In implementation it can be handled as independent content (duplicates for that matter), or redirect from one path to the other.

More in progress...


## How to use

### Automatic Installation

[![Install to Contentful](https://www.ctfstatic.com/button/install-small.svg)](https://app.contentful.com/deeplink?link=apps&id=2ZHom7iZP2MXu57JyR1Gp7)

### Manual Installation

Install the App using by doing the below steps:

1. Create a new Contentful custom App and define the Application Name (e.g. Broken References)

2. Download this repo and drag the dist folder into the Bundles upload zone:

![App Bundles Upload](./docs/showcase-image.png)

Give a name to the bundle

![App Bundles Uploaded](./docs/showcase-image.png)

You can find more details about hosting an [Contentful app her](https://www.contentful.com/developers/docs/extensibility/app-framework/hosting-an-app/)

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is   
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set: 

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Using the `contentful-management` SDK

In the default create contentful app output, a contentful management client is
passed into each location. This can be used to interact with Contentful's
management API. For example

```js
  // Use the client
  cma.locale.getMany({}).then((locales) => console.log(locales))

```

Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.

## Learn More

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.

