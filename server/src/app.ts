import 'dotenv/config';
import http from 'http';
import express from 'express';
import initDB from './models/initModels';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import notFoundController from './middlewares/notFoundController';
import cors from 'cors';
import { ServerSocket } from './models/socket';

const app = express(); // Express app object can handle http requests but is not suitable for sockets.
const httpServer = http.createServer(app); // Node http server object is suitable for sockets.

/** Start the single Socket instance **/
new ServerSocket(httpServer);
// Static instance of the socket server. We can now access the socket server from anywhere in the application.

/** Log the request */
app.use((req, res, next) => {
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    console.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Enable JSON parsing */
app.use(express.json());

/** CORS handling **/
app.use(cors()); // TODO: We should configure CORS properly. We should not allow all origins.
// For the moment we'll use a proxy at client side to avoid CORS issues.

app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use(notFoundController);


/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

/** Listen */
const PORT = process.env.PORT || 5000;
initDB().then(() => {
  httpServer.listen(PORT, () => console.info('🚀🚀Server is running on port', PORT));
});

// ? Passarem el llistat de users actius a través del socket? o bé a través d'una petició http a la API?
// Suposo que aquesta vegada seria a través de socket, de manera que tothom que escolti el socket rebrà la llista de users actius.
// Això vol dir que el client haurà de tenir un socket obert per escoltar aquesta informació, cosa que
// passarà quan l'usuari es registri o faci login.
// Idem amb els missatges.
// Aleshores, els únics API requests que farà el client seràn per register i login.
// En canvi, per enviar missatges, crear rooms i demés, ho farà a través del socket.
