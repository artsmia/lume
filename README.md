# Lume

Welcome to Lume, a digital storytelling platform by the Minneapolis Institute of Art.

If you are interested in contributing to Lume or running your own instance with further configuration, head over to the [Wiki](/wiki) for more detail information about Lume.

## Table of Contents

- [Running Lume](#running-lume)
  - [Local Quickstart](#local-quickstart)
  - [Configuration](#configuration)
  - [Deploying with Now](#deploying-with-now)
- [Overview](#overview)

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

#### [router](/tree/master/app/router)

It's routing is handled by `next` and an `express` server

Most of the styling is through `styled-components` and `grid-styled`.

Image tiling is handled by LeafletJS.

The frontend uses a client-side store powered by apollo to manage data-fetching and to maintain local state.

Authorization is handled by [Auth0](https://auth0.com) and `passport`–– though this can be disabled by running the application in local mode.

A redis store is used for session cacheing.
