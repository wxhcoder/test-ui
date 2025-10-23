import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@test-ui/theme-chalk/index.scss'
import { FlButton, FlIcon } from '../../packages/test-ui'
const plugin = [FlIcon, FlButton]
const app = createApp(App)
plugin.forEach((component) => {
  app.use(component)
})
app.mount('#app')
