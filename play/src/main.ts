import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import FlIcon from '@test-ui/components/icon'

console.log(FlIcon)
const plugin = [FlIcon]
const app = createApp(App)
plugin.forEach((component) => {
  app.use(component)
})
app.mount('#app')

