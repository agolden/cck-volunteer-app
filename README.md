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

# IDE

We suggest installing and using [Visual Studio Code](https://code.visualstudio.com/download) as your integrated development environment (IDE).

# Environment setup

To successfully run this application, you must set several environment variables.

The .env.local file must be present in the root of the directory. You can use the example environment variables file as a starting point:

```console
cp example.env.local .env.local
```
