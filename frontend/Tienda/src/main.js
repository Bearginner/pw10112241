import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Comienza Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHhrkfUhEisU5WYHu2FmQa9wIFJvSxfuY",
  authDomain: "programacion-web-66d37.firebaseapp.com",
  projectId: "programacion-web-66d37",
  storageBucket: "programacion-web-66d37.appspot.com",
  messagingSenderId: "860715349222",
  appId: "1:860715349222:web:f986a6dad712a82ea23727"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Termina Firebase

const app = createApp(App)

app.use(router)

app.mount('#app')
