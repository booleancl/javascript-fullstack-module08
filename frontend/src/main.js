import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import { Auth } from "@/firebase";

Vue.config.productionTip = false

// Configure BaseUrl
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:3000"
// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    const token = await Auth.currentUser?.getIdToken(true);
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
