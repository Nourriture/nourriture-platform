#!/bin/sh
# Procedures to run our test framework and output results
#
# Niels Søholm (2014-10-12)

# Adding "&" to place a job into the background (like opening a new tab)
node server.js --connection-string "mongodb://localhost:27017/nourriture-app-test" &

npm install

mocha

# For local debug purposes (kill running NodeJS server)
# killall node