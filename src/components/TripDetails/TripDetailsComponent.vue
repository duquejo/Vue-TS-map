<template>
  <div v-if="distance" class="trip-container column mt-2 mb-4">
    <div class="col">Distance: <strong>{{ distance }} kms</strong></div>
    <div class="col">Duration: <strong>{{ duration }} minutes</strong></div>
  </div>
</template>

<script lang="ts" src="./TripDetailsComponent.ts" />

<style scoped>
.trip-container {
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  padding: 15px;
}

strong {
  color: #42b983;
}
</style>