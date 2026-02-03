<script setup lang="ts">
import type { ContestedArea } from "@/types/globals";
import GoogleMap from './GoogleMap.vue';
import OsmMap from "./OsmMap.vue";
import { Map as olMap } from 'ol';
import {v4 as uuidv4} from 'uuid';


const props = defineProps<{
    contestedArea:  ContestedArea
}>();
const mapCount = ref(props.contestedArea.googleObserver.length);

const contestedAreaWithId = computed(() => {
  let ret = props.contestedArea.googleObserver.map(observer => {
    observer.id = uuidv4();
    return observer;
  });
  return ret
});
interface MapWithId {
    map: olMap;
    id: string;
}
const syncMaps = ref([] as MapWithId[]);

function updateSyncMaps(updatedMap: MapWithId) {
  const index = syncMaps.value.findIndex(m => m.id === updatedMap.id);
  if (index !== -1) {
    syncMaps.value.splice(index, 1, updatedMap); // <- Remplacement réactif ici
  } else {
    syncMaps.value.push(updatedMap); // si non trouvé, on ajoute
  }
}
</script>

<template>
    <div class="maps-container">
      <GoogleMap v-for="observer in contestedAreaWithId" 
      :key="observer.id" 
      :id="observer.id"
      :center="contestedArea.center" 
      :zoom="contestedArea.zoom" 
      :observer="observer"
      :sync-maps="syncMaps.filter(m => m.id !== observer.id).map(m => m.map as olMap)"
      @map:update="updateSyncMaps">
      </GoogleMap>
      <OsmMap
      :key="'osm-'+contestedArea.name" 
      :id="'osm-'+contestedArea.name"
      :center="contestedArea.center" 
      :zoom="contestedArea.zoom" 
      :sync-maps="syncMaps.filter(m => m.id !== 'osm-'+contestedArea.name).map(m => m.map as olMap)"
      @map:update="updateSyncMaps">
      >
      </OsmMap> 
  </div>
</template>

<style scoped>
.maps-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
}
</style>
