<script setup lang="ts">
import type { ContestedArea } from "@/types/globals";
import Map from './Map.vue';
import { Map as olMap } from 'ol';
import {v4 as uuidv4} from 'uuid';


const props = defineProps<{
    contestedArea:  ContestedArea
}>();
const mapCount = ref(props.contestedArea.regions.length);

const contestedAreaWithId = computed(() => {
  let ret = props.contestedArea.regions.map(region => {
    region.id = uuidv4();
    return region;
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
      <Map v-for="region in contestedAreaWithId" 
      :key="region.id" 
      :id="region.id"
      :center="contestedArea.center" 
      :zoom="contestedArea.zoom" 
      :region="region"
      :sync-maps="syncMaps.filter(m => m.id !== region.id).map(m => m.map as olMap)"
      @map:update="updateSyncMaps">
      </Map>
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
