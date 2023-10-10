import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_APIKEY;

if( !navigator.geolocation ) {
  throw new Error('You must activate the Geolocation service.');
}

createApp(App)
.use(store)
.use(router)
.mount('#app')
