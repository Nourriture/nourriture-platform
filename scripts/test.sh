#!/bin/sh
# Procedures to run our test framework and output results
#
# Niels Søholm (2014-10-12)

# TODO: remove me
BUILD_NUMBER=321

# Package name (name of outputted archieve)
PK_NAME=nourriture-0.1.${BUILD_NUMBER}

# Clean up any old build
rm -r build

# Prepare build output folders
mkdir build
mkdir build/$PK_NAME

# Copy source files
cp server.js build/$PK_NAME/server.js
cp -r modules build/$PK_NAME/modules
cp -r utilities build/$PK_NAME/utilities
cp -r models build/$PK_NAME/models
cp -r test build/$PK_NAME/test

# Inject build number (from Jenkins environment variable) into package.json
# TODO: pass in test DB string!
sed package.json -e "s/\(\"version\":\s\"[0-9]*.[0-9]*.\)[0-9]\"/\1$BUILD_NUMBER\"/g" > build/$PK_NAME/package.json