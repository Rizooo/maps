set -e
set -o verbose
npm install
bower install
mongo mongo.js