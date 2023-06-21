import { reactive } from 'vue';
import { io } from 'socket.io-client';
import { useRouter } from 'vue-router';

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: [],
    participateIn: [],
    currentRoomMessages: [] as string[],
});

const URL = 'http://localhost:3333';

export let socket;

export const init = () => {
    const myName = localStorage.getItem('myName');
    const router = useRouter();

    if (!myName) {
        console.log("myName n'est pas défini");
        router.push('/login');
        return;
    }

    socket = io(URL, {
        auth: {
            name: myName,
        },
    });

    socket.on('connect', () => {
        state.connected = true;
    });

    socket.on('disconnect', () => {
        state.connected = false;
    });

    socket.on('foo', (...args) => {
        state.fooEvents.push(args);
    });

    socket.on('bar', (...args) => {
        state.barEvents.push(args);
    });

    socket.on('participate-in', (str) => {
        const rooms = JSON.parse(str);
        console.log('You participate in rooms', str);
        state.participateIn = rooms;
    });

    socket.on('message-to-room', (msg: string) =>
        state.currentRoomMessages.push(msg)
    );
};

export const joinRoomWith = (n) => {
    console.log('joinRoomWith', n);
    socket.emit('ask-to-join-room', n);
};

export const sendToRoom = (room, message) => {
    socket.emit('send-to-room', JSON.stringify({ room, message }));
};
