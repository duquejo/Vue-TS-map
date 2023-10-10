<template>
  <div class="searchbar-container mt-0 mt-md-3">
    <input
      class="form-control"
      type="text"
      placeholder="Search places..."
      v-model="searchTerm"
    />
    <SearchResultsComponent />
  </div>
</template>

<script lang="ts" src="./SearchbarComponent.ts" />

<style scoped>
.searchbar-container {
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5px;
  z-index: 9999;
  overflow: auto;
  width: 100%;
}
</style>