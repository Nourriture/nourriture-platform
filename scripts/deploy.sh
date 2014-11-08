#!/bin/sh
# Procedures that will deploy and install our application
# using SSH.
#
# NOTE: Expects variables
#   - $ENVIRONMENT: Used root folder and process uid
#   - $PORT:        Port node web server will listen on
#
# Niels Søholm (2014-11-08)

scp nourriture-0.1.*.zip training:/srv/$ENVIRONMENT/nourriture.zip

ssh training <<EOF
  cd /srv/$ENVIRONMENT/

  forever stop dev
  rm -f -r nourriture-*

  unzip -o *.zip
  cd nourriture-*

  npm install
  forever -a --uid "$ENVIRONMENT" -l "/srv/$ENVIRONMENT/logs/forever-dev.log" -o "/srv/$ENVIRONMENT/logs/forever-dev-out.log" -e "/srv/$ENVIRONMENT/logs/forever-dev-err.log" -p "/srv/$ENVIRONMENT/.forever" --minUptime 1000 --spinSleepTime 1000 start server.js $PORT

  exit
EOF