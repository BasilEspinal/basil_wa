import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// Dynamic URL configuration
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://137.184.2.107:8000';

// Initialize socket
export const socket = io(URL, { autoConnect: false });

// Connection state listeners
socket.on('connect', () => {
    state.connected = true;
    console.log('Connected to the server');
});

socket.on('disconnect', () => {
    state.connected = false;
    console.log('Disconnected from the server');
});

// Custom event listeners
socket.on('active-kpis', (...args) => {
    console.log('Active KPIs event received:', args);
});

socket.on('foo', (...args) => {
    state.fooEvents.push(args);
});

socket.on('bar', (...args) => {
    state.barEvents.push(args);
});

// Error handling
socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});
