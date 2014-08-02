Example mostly based on: http://garydengblog.wordpress.com/2013/06/28/simple-chat-application-using-redis-socket-io-and-node-js/

Some Changes:
* Uses express.js
* Includes a bugfix that creates a redis subscriber per client, rather than a global subscriber that was quitting after the first  user disconnection.