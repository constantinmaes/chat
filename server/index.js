import { createServer } from 'http';
import { Server } from 'socket.io';
import * as crypto from 'crypto';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(
        `Connection detected with id ${socket.id} from user ${socket.handshake.auth.name}`
    );

    // ecoute l'événement de déconnexion
    socket.on('disconnect', (reason) =>
        console.log(`User ${socket.handshake.auth.name} disconnected`)
    );

    // écoute l'événement custom 'hello'
    socket.on('hello', (str) => {
        const data = JSON.parse(str);
        console.log(
            `Hello from ${socket.handshake.auth.name} with data ${str}`
        );
    });
});

httpServer.listen(3333);
