import { createServer } from 'http';
import { Server } from 'socket.io';
import * as crypto from 'crypto';

const rooms = [];

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

    const participateIn = rooms.find((r) =>
        r.includes(socket.handshake.auth.name.toLowerCase())
    );

    if (participateIn) {
        participateIn.forEach((r) => socket.join(r));
    }

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

    // écoute l'événement ask-to-join-room
    socket.on('ask-to-join-room', (n) => {
        console.log(
            `${socket.handshake.auth.name} asked to join room with ${n}`
        );
        const names = [socket.handshake.auth.name, n];
        names.sort();
        const roomName = names.join('-').toLowerCase();
        rooms.push(roomName);
        console.log(roomName);
        socket.join(roomName);
    });
});

httpServer.listen(3333);
