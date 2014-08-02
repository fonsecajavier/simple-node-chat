Chat server/client that illustrates usage of Node and Redis, including latter's publish/subscribe commands.

Example mostly based on: http://garydengblog.wordpress.com/2013/06/28/simple-chat-application-using-redis-socket-io-and-node-js/

Some Changes:
* Uses express.js
* Includes a bugfix that prevents the redis subscriber from quitting after the first user disconnection.