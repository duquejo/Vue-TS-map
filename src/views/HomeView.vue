<template>
  <MapViewComponent />
  <MyLocationComponent />
  <div class="navigation-items mx-4 mb-5 d-md-flex flex-md-column justify-md-space-between mx-md-4 my-md-0">
    <SearchbarComponent />
    <TripDetailsComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '@/composables';
import MapViewComponent from '@/components/MapView/MapViewComponent.vue';
import MyLocationComponent from '@/components/MyLocation/MyLocationComponent.vue';
import SearchbarComponent from '@/components/Searchbar/SearchbarComponent.vue';
import TripDetailsComponent from '@/components/TripDetails/TripDetailsComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MapViewComponent,
    MyLocationComponent,
    SearchbarComponent,
    TripDetailsComponent,
  },
  setup() {
    usePlacesStore();
  }
});
</script>

<style scoped>
.navigation-items {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 10px;
  max-width: 100%;
}

@media only screen and (min-width: 768px){
  .navigation-items {
    max-width: 30%;
    top: 0px;
    bottom: 0px;
  }
}

</style>