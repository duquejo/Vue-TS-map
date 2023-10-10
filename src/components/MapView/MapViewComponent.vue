<template>
  <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h3>Wait a second</h3>
      <span>Geolocating....</span>
    </div>
  </div>

  <div v-show="isUserLocationReady" class="map-container" ref="mapElement" />
</template>

<script lang="ts" src="./MapViewComponent.ts" />

<style scoped>
.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.loading-map {
  background-color: rgba(0,0,0,0.8);
  color: #FFF;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
}
</style>