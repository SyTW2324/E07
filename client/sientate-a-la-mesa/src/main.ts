import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router';


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { es } from 'vuetify/locale'

// i18n

const messages = {
  es: {
    $vuetify: es,
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages,
})



// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({i18n, useI18n}),

  },
  theme: {
    defaultTheme: 'light',
    //
  },
})

createApp(App).use(vuetify).use(i18n).use(router).use(pinia).mount('#app')

