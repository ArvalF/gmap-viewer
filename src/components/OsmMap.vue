<script setup lang="ts">
import type { Map as olMap } from 'ol';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const envVar = import.meta.env.VITE_COUCOU;

const props = defineProps({
    // region: { type: Object as PropType<GoogleMapRegion> },
    id: String,
    center: Array,
    zoom: Number,
    syncMaps: { type: Array as PropType<Array<olMap>> }
})
const center = ref(props.center);
const zoom = ref(6);
// const selectedRegion = ref(props.region);
const mapRef = ref(null);

const emit = defineEmits(['map:update']);
const mapIsLoading = ref(false);

function SetLoadingStatus(status: boolean) {
  mapIsLoading.value = status;
}
onMounted(() => {
    emit('map:update', {map : mapRef.value.map, id : props.id});
});

</script>

<template>
  <div class="map-container">
    <h2>OpenStreet Map Version</h2>
    <!-- <RegionSelector
      v-model="selectedRegion"
    /> -->
    <br>
      <ol-map 
      ref="mapRef" 
      :loadTilesWhileAnimating="true" 
      id="id"
      class="map" 
      :class="{ 'ol-map-loading': mapIsLoading }">
        <ol-view
        :center="center"
        :zoom="zoom"
        :minZoom="4"/>
        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>
        <ol-interaction-synchronize :maps="syncMaps" />
      </ol-map>
  </div>
</template>

<style scoped>
h2  {
  color: #ff9bee;
}
.map-container {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.map {
  width: 400px;
  height: 400px;
  position: relative;
}
.ol-map-loading::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  border-top-color: var(--vp-c-brand-1);
  animation: spinner 0.6s linear infinite;
}
</style>
