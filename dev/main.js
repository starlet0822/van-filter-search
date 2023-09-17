import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
const app = createApp(App)

// import VanFilterSearch  from '../dist/van-filter-search.es' // 打包调试
// import '../dist/style.css' // perf: 怎么实现不用手动引入？
// VanFilterSearch.VanFilterSearch.name = 'FilterSearch' // 避免 自动导入插件报错
// console.log('VanFilterSearch:', VanFilterSearch)
// app.use(VanFilterSearch)

app.mount('#app')
