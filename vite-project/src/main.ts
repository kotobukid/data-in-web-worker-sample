import {createApp, provide} from 'vue'
import './style.css'
import App from './App.vue'
import Worker from './worker.js?worker';

// @ts-ignore
const worker = new Worker();

const app = createApp(App);
app.provide('worker', worker);
app.mount('#app');

