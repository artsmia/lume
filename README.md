# Lume

Welcome to Lume, a digital storytelling platform by the Minneapolis Institute of Art.

## Table of Contents

- [Running Lume] (#running-lume)
  - [Local Quickstart] (#local-quickstart)


## Running Lume

## Local Quickstart

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
