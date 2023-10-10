<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center my-2">
    <h5>Loading</h5>
    <span>Wait a second...</span>
  </div>
  <ul v-else-if="places.length > 0" class="list-group my-3">
    <li
      v-for="place in places" 
      :key="place.id" 
      :class="{ 'active': place.id === activePlace }"
      class="list-group-item list-group-item-action"
      @click="onPlaceClick(place)">
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button 
          :class="( place.id === activePlace) ? 'btn-outline-light' : 'btn-outline-primary'"
          class="btn btn-sm"
          @click.self="getRouteDirections(place)">
          Directions
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" src="./SearchResultsComponent.ts" />

<style scoped>
h5 {
  font-size: 15px;
  margin-bottom: 5px;
}
p {
  font-size: 12px;
}
li {
  cursor: pointer;
}
ul {
  max-height: 150px;
  overflow-y: auto;
}
@media only screen and (min-width: 768px){
  ul {
    max-height: 100%;
    overflow-y: hidden;
  }
}
</style>