import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import store from "./store/index";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./data/firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

registerPlugins(app);

app.use(store);

app.mount("#app");
