<template>
  <button 
    v-if="isReadyBtn" 
    class="btn btn-primary" 
    @click="onMyLocationClick">
    My location
  </button>
</template>

<script lang="ts" src="./MyLocationComponent.ts" />


<style scoped>
button {
  position: fixed;
  top: 10px;
  right: 10px;
  left: 10px;
}

@media only screen and (min-width: 768px){
  button {
    top: 10px;
    right: 10px;
    left: inherit;
  }
}
</style>