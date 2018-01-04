# Lume

Welcome to Lume, a digital storytelling platform by the Minneapolis Institute of Art.

## Running Lume Locally

If you're interested in contributing to Lume (or you just want to try it out on your own machine), you can follow these directions to get the application running on your local machine.

Right now, you'll need a Mac to run the application but I'd welcome a pull request from a Windows user with directions about how to get started.

1. Clone the repository and install dependencies

Open up your terminal, clone the repository, and the navigate into the directory.

```bash
git clone https://github.com/artsmia/lume.git
cd lume
yarn install
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

4. Edit the `.env.TEMPLATE` file

Rename the file `.env.TEMPLATE` to `.env`.

The `.env` file will initially be configured for local use. Advanced users may connect Lume to their own database, Aws S3 for file storage, and Auth0 for authentication by changing these environment variables.

5. Initialize the Database

Now that your MySQL server is running and has a database named `lume`, you will need to provide the database with a schema. To do this, enter the following command in the terminal from lume's root directory.

```bash
yarn run reinit
```

6. Start up the application

Because Lume actually consists of two separate node servers (one for the api, the other to serve and provide routing for the next.js application), you'll need to open up two different terminal windows and navigate both of them into the root director of the lume repository. Once there you will enter these two commands into separate windows:

```bash
yarn run start-api:local
```
...and...

```bash
yarn run start-next:local
```
