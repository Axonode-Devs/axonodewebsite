import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
import { faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faCoffee, faChevronRight, faGithub)

import { initializeAxon } from "./libs/AxonConnector"

// 2. Configure the library for production
initializeAxon({
  baseURL: 'https://axonode.org/api'
})

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')