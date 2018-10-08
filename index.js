const SockJs = require('sockjs-client');
const sockJs = require('sockjs');

module.exports = (upstreamPath, serverOptions) => {

    const sockJsServer = sockJs.createServer(serverOptions || {});

    sockJsServer.on('connection', conn => {
        const sockJsClient = new SockJs(upstreamPath);
        conn.on('data', message => {
            sockJsClient.send(message);
        });
        conn.on('close', () => {
            sockJsClient.close();
        });
        sockJsClient.onmessage = e => {
            conn.write(e.data);
        };
        sockJsClient.onclose = () => { conn.end(); };
    });

    return sockJsServer;

};