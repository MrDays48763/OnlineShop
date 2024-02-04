import { createApp } from "vue";
import App from "./App.vue";
// 引入router
import router from "./router";
// 引入bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

// 引入mitt
// import mitt from "mitt";

import store from "./store";

// const eventBus = mitt();
const app = createApp(App).use(store);

// app.config.globalProperties.eventBus = eventBus;
app.use(router).mount("#app");
