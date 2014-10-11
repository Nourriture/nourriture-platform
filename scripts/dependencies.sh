#!/bin/sh
# Environment dependencies, i.e. anything that has to be installed
# system-wide to configure and run the application.
#
# NOTE: Script assumes OS is Ubuntu 14.04 or newer.
#
# Niels Søholm (2014-10-11)

sudo su
apt-get update

# Install Node.js (Webserver/Engine)
apt-get install nodejs

# Install Node Package Manager (NPM, to manage 3rd-party JS dependencies)
apt-get install npm