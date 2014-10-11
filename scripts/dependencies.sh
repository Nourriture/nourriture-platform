#!/bin/sh
# Environment dependencies, i.e. anything that has to be installed
# system-wide to configure and run the application.
#
# NOTE: Script assumes OS is Ubuntu 14.04 or newer.
#
# Niels Søholm (2014-10-11)

apt-get update

# Install Node.js dependencies
apt-get -y install g++ curl libssl-dev apache2-utils
apt-get -y install git-core

# Install Node.js (Webserver/Engine)
mkdir tmp
cd tmp
git clone git://github.com/ry/node.git
cd node
git checkout v0.10.32-release
./configure
make
make install
cd ../..

# Install Node Package Manager (NPM, to manage 3rd-party JS dependencies)
cd tmp
wget http://npmjs.org/install.sh
sh ./install.sh
cd ..

# Clean up
rm -r tmp