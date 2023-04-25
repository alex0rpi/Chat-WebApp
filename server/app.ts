import 'dotenv/config';
import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';

const app = express(); // Express app object can handle http requests but is not suitable for sockets.
const httpServer = http.createServer(app); // Node http server object is suitable for sockets.

/** Start the single Socket instance **/
new ServerSocket(httpServer);
// Static instance of the socket server. We can now access the socket server from anywhere in the application.

/** Log the request */
app.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Enable JSON parsing */
app.use(express.json());

/** CORS handling **/
// For the moment we'll use a proxy at client side to avoid CORS issues.

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    
    res.status(404).json({
        message: error.message,
    });
});

/** Listen */
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.info('🚀🚀Server is running on port', PORT));
