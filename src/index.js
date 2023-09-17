import Component from './components/index.vue'
// import './styles/index.scss'
// import pkg from '../package.json'

export const VanFilterSearch = Component
export const install = (app) => {
  app.component(Component.name, Component)
  app.component('VanFilterSearch', Component)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.createApp({}).component('VanFilterSearch', Component)
}

export default {
  VanFilterSearch,
  install,
}
