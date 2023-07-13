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

## Learn More

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).
