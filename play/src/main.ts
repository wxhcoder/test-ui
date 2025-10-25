import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@test-ui/theme-chalk/index.scss'
// import { FlButton, FlIcon, FlInput } from '../../packages/test-ui'
// const plugin = [FlIcon, FlButton, FlInput]
// import TestUI from '../../packages/test-ui'
// import TestUI from '../../dist/test-ui/es/index.mjs'
import TestUI from 'test-ui'
const app = createApp(App)
app.use(TestUI)
app.mount('#app')
