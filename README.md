# Lume

Welcome to Lume, a digital storytelling platform by the Minneapolis Institute of Art.

## Lume Local Quickstart

If you're interested in contributing to Lume (or you just want to try it out on your own machine), you can follow these directions to get the application running on your local machine.

Lume is a feature-rich, full stack application that utilizes a number of different services and can be configured in a number of different ways. In this quickstart, we are going to launch Lume in local mode.


*Disclaimer: These directions are for Mac users. Because Lume is largely a Node application, some of its dependencies don't play well with Microsoft operating systems.*


1. Clone the repository and install dependencies

Open up your terminal, navigate to the directory where you like to keep your coding projects, clone the repository, and the navigate into the lume directory.

```bash
git clone https://github.com/artsmia/lume.git
cd lume

```

2. Start up the application

Because Lume is actually made up of a number of different services, you'll need to open up three different terminal windows. In one, cd into `lume/data-api`, in the next `lume/local-tiler`, and in the last `lume/app`.

In each of these terminal windows you'll need to install dependencies.

```bash
# first you'll need to install their respective dependencies
yarn install
```

Finally, you will enter the following command separately into each terminal window to start them each up:

```bash
yarn run start-api:local
```
