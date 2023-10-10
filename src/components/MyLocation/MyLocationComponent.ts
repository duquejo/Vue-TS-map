import { useMapStore, usePlacesStore } from '@/composables';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MyLocationComponent',
  setup() {
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    return {
      isReadyBtn: computed<boolean>(() => isUserLocationReady.value && isMapReady.value ),

      onMyLocationClick: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 17,
        });
      }
    };
  },
});