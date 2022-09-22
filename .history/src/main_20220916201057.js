import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "../firebase.js"
import "../package.json"

createApp(App).use(router).mount("#app")
