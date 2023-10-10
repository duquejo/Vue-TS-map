import { usePlacesStore, useMapStore } from "@/composables";
import Mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: 'MapViewComponent',
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {

      if( ! mapElement.value ) throw new Error('Container doesn\t exists.');
      if( ! userLocation.value ) throw new Error('User location not found.');

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup()
        .setLngLat( userLocation.value )
        .setHTML(`<h3>I'm here</h3>`);

      new Mapboxgl.Marker()
        .setLngLat( userLocation.value )
        .addTo(map)
        .setPopup( myLocationPopup );

      /**
       * Setting initial global mapbox instance.
       */
      setMap(map);
    };

    onMounted(() => {
      if( isUserLocationReady.value ){
        return initMap();
      }
    });

    watch( isUserLocationReady, () => {
      if( isUserLocationReady.value ) initMap();
    });

    return {
      mapElement,
      isUserLocationReady
    };
  },
});