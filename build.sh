set -e
set -o verbose
npm install
npm install -g bower
bower install
mongo mongo.js