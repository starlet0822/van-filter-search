import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import VanFilterSearch from "van-filter-search";
// import 'van-filter-search/dist/style.css';
VanFilterSearch.VanFilterSearch.name = 'FilterSearch' // 避免 自动导入插件报错
app.use(VanFilterSearch);

app.use(router)

app.mount('#app')
