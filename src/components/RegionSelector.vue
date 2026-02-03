<script setup lang="ts">
import { useDefineGoogleMapRegion } from '@/composables/useDefineGoogleMapRegion';
import type { GoogleMapRegion } from '@/types/GoogleMapRegion';
import { onClickOutside } from '@vueuse/core'

const googleMapRegion = useDefineGoogleMapRegion();
const selectedRegion = defineModel({
    type: Object as PropType<GoogleMapRegion>,
    required: false,
    default: '',
  });

  const isOpen = ref(false);
  const search = ref('');
  const dropDownMenuRef = ref(null);
  
  const filteredRegions = computed(() => {
    if (!search.value) return googleMapRegion;
    return googleMapRegion.filter((region) =>
      region.region.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  function toggleDropdown() {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
      search.value = '';
    }
  }
  
  function closeDropdown() {
    isOpen.value = false;
    search.value = '';
  }
  
  function selectRegion(code_regional) {
    isOpen.value = false;
    search.value = '';
    selectedRegion.value = googleMapRegion.find(r => r.code_regional === code_regional);
  }
  
  onClickOutside(dropDownMenuRef, () => {
    closeDropdown();
  });
  </script>
  <template>
    <div ref="dropDownMenuRef" class="dropdown-menu">
      <div class="dropdown-header" @click="toggleDropdown" @click.stop>
        {{ selectedRegion.region || 'Sélectionner une région' }}
        <span class="arrow">{{ isOpen ? '▲' : '▼' }}</span>
      </div>
      <div v-if="isOpen" class="dropdown-list-container">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher..."
          class="search-input"
        />
        <ul class="dropdown-list">
          <li
            v-for="region in filteredRegions"
            :key="region.code_regional"
            @click="selectRegion(region.code_regional)"
            class="dropdown-item"
          >
            {{ region.region }}
          </li>
          <li v-if="filteredRegions.length === 0" class="dropdown-no-result">
            Aucun résultat
          </li>
        </ul>
      </div>
    </div>
  </template>
  <style scoped>
  .dropdown-menu {
    color: #ff9bee;
    user-select: none;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    width: 300px;
    z-index: 1000;
    position: relative;
  }
  
  .dropdown-header {
    border: 1px solid #aaa;
    padding: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    background-color: black;
  }
  .dropdown-list-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    width: inherit;
  }
  .dropdown-list {
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #aaa;
    background: black;
    max-height: 50vh;
    overflow-y: auto;
    scrollbar-width: thin;
    z-index: 10;
  }
  
  .search-input {
    box-sizing: border-box;
    padding: 6px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    width: inherit;
    position: sticky;
  }
  
  .dropdown-item {
    padding: 8px;
    cursor: pointer;
  }
  
  /* .dropdown-item:hover {
    background: #eee;
  } */
  
  .dropdown-no-result {
    padding: 8px;
    color: #999;
    font-style: italic;
  }
  
  .arrow {
    font-size: 0.8em;
    margin-left: 8px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  </style>
  