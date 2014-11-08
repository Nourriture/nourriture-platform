#!/bin/sh
# Procedures that will deploy and install our application
# using SSH.
#
# Niels Søholm (2014-11-08)

scp nourriture-0.1.*.zip training:/srv/nourriture/nourriture.zip

ssh training <<EOF
  cd /srv/nourriture/

  forever stop dev
  rm -f -r nourriture-*

  unzip -o *.zip
  cd nourriture-*

  npm install
  forever -a --uid "dev" -l "/srv/nourriture/logs/forever-dev.log" -o "/srv/nourriture/logs/forever-dev-out.log" -e "/srv/nourriture/logs/forever-dev-err.log" -p "/srv/nourriture/.forever" --minUptime 1000 --spinSleepTime 1000 start server.js 2121

  exit
EOF