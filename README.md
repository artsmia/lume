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

2. Download and Install MySQL Community Server

You can find the file and directions in the downloads section of [MySQL website](https://dev.mysql.com/downloads/mysql/). (You may need to create a free account with Oracle to access the download)

3. Create and configure a local database

Once you've installed Mysql, you need to make sure the server is running. The easiest way to do this is to go up to your toolbar => Apple => System Preferences... => MySQL => and then Start MySQL Server if it isn't already running.

Now we will connect to the server from the command line. In your terminal enter:

```bash
mysql -h localhost -u root

# and then you should see
# Welcome to the MySQL monitor.  Commands end with ; or \g.
#...
#mysql>

```

Next, we're going to create our Lume database by entering the following command after the `mysql>`

```sql
CREATE DATABASE IF NOT EXISTS lume
```

You can quit out of the mysql terminal with `\q`.

If you want to use a graphic interface with MySQL, [MySQL workbench](https://dev.mysql.com/doc/workbench/en/) is free and available on the MySQL website.

4. Edit the three `.env.local.TEMPLATE` files.  One is in `/data-api`, the second is in `/scripts`, and the third is in `/app`

Rename all three `.env.local.TEMPLATE` to `.env.local`.

Each `.env` file will initially be configured for local use. Advanced users may connect Lume to their own database, Aws S3 for file storage, and Auth0 for authentication by changing these environment variables.

Make sure that your database information matches the database information in both `.env.local` files.


5. Initialize the Database

Now that your MySQL server is running and has a database named `lume`, you will need to provide the database with a schema. To do this, enter the following command in the terminal from lume's scripts directory.

```bash
# from the root lume directory
# navigate to the scripts directory
cd scripts
# install our scripts dependencies
yarn install
# initialize our database
yarn run reinit
```

6. Start up the application

Because Lume is actually made up of a number of different services, you'll need to open up three different terminal windows. In one, into `lume/data-api`, in the next `lume/local-tiler`, and in the last `lume/app`.

In each of these terminal windows you'll need to install dependencies.

```bash
# first you'll need to install their respective dependencies
yarn install
```

Finally, you will enter the following command separately into each terminal window to start them each up:

```bash
yarn run start-api:local
```
