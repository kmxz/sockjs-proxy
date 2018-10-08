# sockjs-proxy

Forward a [SockJS](https://github.com/sockjs) connection to an upstream SockJS server.

Example: listening at port 8000, forwarding connections to port 8080.

    const createProxy = require('sockjs-proxy');

    const proxy = createProxy('http://localhost:8080/echo', { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
    const server = http.createServer();
    proxy.installHandlers(server, { prefix: '/echo' });
    server.listen(8000, '0.0.0.0');