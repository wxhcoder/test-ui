import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@test-ui/theme-chalk/index.scss'
import { FlButton, FlIcon, FlInput } from '../../packages/test-ui'
const plugin = [FlIcon, FlButton, FlInput]
const app = createApp(App)
plugin.forEach((component) => {
  app.use(component)
})
app.mount('#app')
