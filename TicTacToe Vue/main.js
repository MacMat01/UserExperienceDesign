import {createApp} from 'vue'
import App from './App.vue'
import Schema from "@/components/Schema.vue";
import Cell from "@/components/Cell.vue";

//import './assets/main.css'

const app = createApp(App);

app.component('Schema', Schema).component('Cell', Cell);

app.mount('#app')
