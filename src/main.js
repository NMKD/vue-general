import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import store from "./store/index";
import { onAuthStateChanged, getAuth } from "firebase/auth";

let app = "";

onAuthStateChanged(getAuth(), (user) => {
  if (!app) {
    store.dispatch("authActions", user);
    store.dispatch("fetchAds");
    app = createApp(App);
    registerPlugins(app);
    app.use(store);
    app.mount("#app");
  }
});
