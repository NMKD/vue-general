import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import store from "./store/index";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./data/firebaseConfig";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Initialize Firebase
initializeApp(firebaseConfig);

let app = "";

onAuthStateChanged(getAuth(), (user) => {
  if (!app) {

    store.dispatch("authActions", user);

    app = createApp(App);

    registerPlugins(app);

    app.use(store);

    app.mount("#app");
  }
});
