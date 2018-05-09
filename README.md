# Lume

Welcome to Lume, a digital storytelling platform by the Minneapolis Institute of Art.

If you are interested in contributing to Lume or running your own instance with further configuration, head over to the [Wiki](/wiki) for more detail information about Lume.

## Table of Contents

- [Running Lume](#running-lume)
  - [Local Quickstart](#local-quickstart)
  - [Configuration](#configuration)
  - [Deploying with Now](#deploying-with-now)
- [Overview](#overview)
  - [app](#app)
  - [data-api](#data-api)
  - [image-tiler](#image-tiler)
  - [local-tiler](#local-tiler)
  - [mia-micro-obj](#mia-micro-obj)
  - [mia-micro-obj-search](#mia-micro-obj-search)
  - [scripts](#scripts)
  - [.travis.yml](#.travis.yml)
- [In Depth](#in-depth)

- [How To](#how-to)
  - [Create a new type of content][#create-a-new-type-of-content]

## Running Lume



### Local Quickstart

If you're interested in contributing to Lume (or you just want to try it out on your own machine), you can follow these directions to get the application running on your local machine.

Lume is a feature-rich, full stack application that utilizes a number of different services and can be configured in a number of different ways. In this quickstart, we are going to launch Lume in local mode.


*Disclaimer: These directions are for Mac users. Because Lume is largely a Node application, some of its dependencies don't play well with Microsoft operating systems.*


1. Clone the repository

Open up your terminal, navigate to the directory where you like to keep your coding projects, clone the repository, and the navigate into the lume directory.

```bash
# /<your-code-directory>
git clone https://github.com/artsmia/lume.git
cd lume

```

2. Edit the config file

When running locally, Lume takes all of its environment variables from a single `.env` configuration file located in `lume/config`.

To start, we will copy and rename the `.env.TEMPLATE` file. The file is currently configured to run Lume in local mode however you may reconfigure it if you please.

```bash
# /lume
cp config/.env.TEMPLATE config/.env
```


3. Install dependencies and start up the application(s)

Because Lume is actually made up of a number of different services, you'll need to open up three different terminal windows.

In the first terminal:

```bash
# /lume
# navigate into app
cd app

# install dependencies
yarn install

# start up the server
yarn start
```

In the second terminal:

```bash
# /lume
# navigate into data-api
cd data-api

# install dependencies
yarn install

# start up the server
yarn start
```

In the third terminal:

```bash
# /lume
# navigate into local-tiler
cd local-tiler

# install dependencies
yarn install

# start up the server
yarn start
```

4. Try the site!

Great! Now if everything worked, you should be able to visit http://localhost:3000 to see Lume running locally.

### Configuration

### Deploying with Now

## Overview

The Lume repository is actually composed of a number of smaller applications and microservices.

### [app](/app)

The `app` directory contains the codebase for the front end UI for Lume's CMS and storytelling application. It is written in es6+ Javascript and compiled using `babel`.

Production is deployed using Now.

The application has been configured for unit tests –– and several have been written, however, more development is needed in this area.

#### [apollo](/app/apollo)

The frontend uses a client-side store powered by `apollo` to fetch data for the components and to maintain local state.

Each root level page component has been wrapped with a higher order component (HOC) that's defined in [`app/apollo/index.js`](/app/apollo/index.js). This HOC is responsible for ensuring that the root page components have access to the apollo client when rendered on the server and that server state is then passed along to those components on the client.

Most of the lower level components in the application then use the queries and mutations defined in the [queries](/app/apollo/queries) and [mutations](/app/apollo/mutations) directories to define their own data needs.


#### [auth](/app/auth)

Authorization is handled by [Auth0](https://auth0.com) and [`passport`](/app/router/passport.js)–– though this can be disabled by running the application in local mode.

The class defined in `/app/auth/index.js` manages authentication during the `getInitialProps` lifecycle method on root page level components where necessary.

#### [components](/app/components)

All of Lume's components have been built with React. They are typically housed in a directory with the name of the component. The actual component file usually lives in a file fitting the `<ComponentName>.component.js` convention.

The `index.js`file typically uses HOC to wrap the directory's component in a number of HOC which provide the component with the data it needs.

##### [cms](/app/components/cms)

These are the components that make up most of the CMS side of the application.

##### [contents](/app/components/contents)

...Except for the Content components. Each of the directories in the contents directory define both the editor and display components for the apps different content types.

##### [lume](/app/components/lume)

These are the components that make up most of the storytelling side of the application.


##### [mia-ui](/app/components/mia-ui)

Most of the lowest level presentational components are drawn from a shared library of home grown React components –– though many components will also define their own styled components at the end of the file.

They have been styled with `styled-components` and `grid-styled` and are loosely styled to match Mia's own style guide.


##### [shared](/app/components/shared)

These are components that are being shared between the CMS and the Storytelling application.

#### [pages](/app/pages)

The pages directory contains React components that have been wrapped in the apollo `WithData` HOC and make use of `next`'s `getInitialProps` lifecycle method. Their paths are referenced in the router and as the pathname variable given to `next/link` components.

#### [router](/app/router)

The Lume app uses both client and serverside routing thanks to `next` and `express`.

#### [static](/app/static)

The static directory contains some assorted assets that are referenced by the app.

### [config](/config)

The config directory is where you should keep any environment variables you'll need to run Lume locally. The .gitignore file is set to ignore any .env files so that you can keep any secrets out of source control. The `.env.TEMPLATE` file gives an example of the configuration information that's being used through out the application.

Environment variables for other environments are defined with those environments. For instance, in production, the data-api and app have their environment variables saved using now's secret api and are referenced in their respective `now.json` files.

### [data-api](/data-api)

### [image-tiler](/image-tiler)

### [local-tiler](/local-tiler)

### [mia-micro-obj](/mia-micro-obj)

### [mia-micro-obj-search](/mia-micro-obj-search)

### [scripts](/scripts)

### [.travis.yml](.travis.yml)
