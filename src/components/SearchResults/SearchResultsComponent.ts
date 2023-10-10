import { useMapStore, usePlacesStore } from '@/composables';
import { Feature } from '@/interfaces/places';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SearchResultsComponent',
  setup() {

    const { places, isLoadingPlaces, userLocation } = usePlacesStore();
    const { map, setPlacesMarkers, getRouteBetweenPoints } = useMapStore();

    const activePlace = ref<string>('');
    
    watch( places, (newPlaces) => {
      activePlace.value = ''; // Reset active place visual conditional
      setPlacesMarkers(newPlaces);
    });

    return {
      isLoadingPlaces,
      places,

      activePlace,

      onPlaceClick: (place: Feature) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        map.value?.flyTo({
          zoom: 14,
          center: [ lng, lat ],
        });
      },

      getRouteDirections: (place: Feature) => {
        if( ! userLocation.value ) return;

        const [lng, lat] = place.center;
        const [startLng, startLat] = userLocation.value;
        
        const start: [ number, number ] = [ startLng, startLat ];
        const end: [ number, number ] = [ lng, lat ];

        getRouteBetweenPoints( start, end );

        map.value?.flyTo({
          zoom: 14,
          center: [ lng, lat ],
        });
      },
    };
  },
});