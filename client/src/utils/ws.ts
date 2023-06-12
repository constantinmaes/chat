import { reactive } from 'vue';
import { io } from 'socket.io-client';
import { useRouter } from 'vue-router';

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: [],
});

const URL = 'http://localhost:3000';

export let socket;

export const init = () => {
    socket = io(URL);
};

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
