#!/bin/sh
# Procedures needed to deploy application in a production setting.
# Certain files/configurations should be different or excluded in
# a production environment as opposed to a development environment.
#
# Niels Søholm (2014-10-11)


# Package name (name of outputted archieve)
PK_NAME=nourriture-0.1.${BUILD_NUMBER}

# Clean up any old build
rm -r build

# Prepare build output folders
mkdir build
mkdir build/$PK_NAME

# Copy source files
cp index.js build/$PK_NAME/index.js

# Inject build number (from Jenkins environment variable) into package.json
sed package.json -e "s/\(\"version\":\s\"[0-9]*.[0-9]*.\)[0-9]\"/\1$BUILD_NUMBER\"/g" > build/$PK_NAME/package.json

# Package everything into a tar with version number in the filename
cd build
zip $PK_NAME.zip -r $PK_NAME/
cd ..
#tar jcvf build/nourriture-0.1.${BUILD_NUMBER}.tar.bz2 build/package