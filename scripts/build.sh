#!/bin/sh
# Procedures needed to deploy application in a production setting.
# Certain files/configurations should be different or excluded in
# a production environment as opposed to a development environment.
#
# Niels Søholm (2014-10-11)

mkdir build
mkdir build/package

cp index.js build/package/index.js
cp package.json build/package/package.json

tar jcvf build/nourriture-0.1.${BUILD_NUMBER}.tar.bz2 build/package