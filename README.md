# Developer Quickstart

The console commands below assume you are developing on a Debian-based Linux system and were tested with Ubuntu 22.04.1; modify to suit your particular setup.

# Install base requirements
To run this code, you will need:

* git (source code upload/download)
* Node.js (code runtime; we suggest the latest runtime supported by AWS lambda; as of 13/09/22 v16)
* MySQL (database instance)

```console
sudo apt -y install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt update
sudo apt -y install git nodejs mysql-server
```

# Clone the repo and install dependencies

```console
git clone https://github.com/agolden/cck-volunteer-app
cd cck-volunteer-app
npm install
```

# Browser

We suggest installing and using Chromium as your principal browser for development purposes.

```console
sudo apt install -y chromium-browser
```

# IDE

We suggest installing and using [Visual Studio Code](https://code.visualstudio.com/download) as your integrated development environment (IDE).

# Environment setup

To successfully run this application, you must set several environment variables.

The .env.local file must be present in the root of the directory. You can use the example environment variables file as a starting point:

```console
cp example.env.local .env.local
```

In this file, there are several default variables that may be changed (and several others that may be added):

* *DB_HOST* - *REQUIRED* The database instance's fully qualified domain name
* *DB_MASTER_USER* - The database master user; only required if using initial database setup scripts (see below)
* *DB_MASTER_PASSWORD* - The database master user's password; only required if using initial database setup scripts (see below)
* *DB_NAME* - *REQUIRED* The name of the application's database
* *DB_USER* - *REQUIRED* The application's database username
* *DB_PASSWORD* - *REQUIRED* The application's database password

A script has been provided to randomly generate passwords for your .env.local file, if desired:
```console
./scripts/generate-passwords.sh
```

A script has been provided to update the database's root user's password from the .env.local file, if desired:
```console
sudo ./scripts/update-master-db-password.sh
```

A script has been provided to create the application's database and database user, if desired:
```console
./scripts/create-db.sh
```