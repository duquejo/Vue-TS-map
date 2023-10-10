import { computed, defineComponent, ref } from 'vue';
import SearchResultsComponent from '@/components/SearchResults/SearchResultsComponent.vue';
import { usePlacesStore } from '@/composables';

export default defineComponent({
  name: 'SearchbarComponent',
  components: {
    SearchResultsComponent
  },
  setup() {

    
    const debounceTimeout = ref();
    const debouncedValue = ref('');
    
    const { searchPlacesByTerm } = usePlacesStore();

    return {
      debouncedValue,

      searchTerm: computed({
        get: () => {
          return debouncedValue.value;
        },
        set: (val: string) => {
          if( debounceTimeout.value ) {
            clearTimeout( debounceTimeout.value );
          }
          debounceTimeout.value = setTimeout( async () => {
            debouncedValue.value = val;
            await searchPlacesByTerm( debouncedValue.value );
          }, 500 );
        }
      }),
    };
  },
});