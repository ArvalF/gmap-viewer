<script setup lang="ts">
import useDefineContestedArea from './composables/useDefineContestedArea';

const contestedAreas = useDefineContestedArea();
const selectedArea = ref(contestedAreas[0]);
</script>

<template>
    <div class="header">
      <h1>Google Map et les frontières</h1>
      <ContestedAreaSelector 
      v-model="selectedArea"
    />
    </div>

    <div class="main-content">
      <MapComparator 
      :contestedArea="selectedArea"
    />
    </div>
</template>

<style >
#app {
  font-weight: normal;
  display: grid;
  grid-template-rows: 10rem 1fr;
  padding: 1rem;
  height: 100vh;
}
h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-content {
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}

.header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
}
</style>
