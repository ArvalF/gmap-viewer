<script setup lang="ts">
import useDefineContestedArea from '@/composables/useDefineContestedArea';
import type { contestedArea } from '@/types/contestedArea';
import { onClickOutside } from '@vueuse/core'

const contestedArea = useDefineContestedArea();
const selectedArea = defineModel({
    type: Object as PropType<contestedArea>,
    required: false,
    default: '',
  });

  const isOpen = ref(false);
  const search = ref('');
  const dropDownMenuRef = ref(null);
  
  // const filteredAreas = computed(() => {
  //   if (!search.value) return contestedArea;
  //   return contestedArea.filter((area) =>
  //     area.name.toLowerCase().includes(search.value.toLowerCase())
  //   );
  // });

  const groupedAreas = computed<Record<string, ContestedArea[]>>(() => {
  const areas = search.value
    ? contestedArea.filter(area =>
        area.name.toLowerCase().includes(search.value.toLowerCase())
      )
    : contestedArea;

  return areas.reduce((acc, area) => {
    if (!acc[area.region]) {
      acc[area.region] = [];
    }
    acc[area.region].push(area);
    return acc;
  }, {} as Record<string, ContestedArea[]>);
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
  
  function selectArea(area: contestedArea) {
    isOpen.value = false;
    search.value = '';
    selectedArea.value = area
  }
  
  onClickOutside(dropDownMenuRef, () => {
    closeDropdown();
  });
  </script>
  <template>
    <div ref="dropDownMenuRef" class="dropdown-menu">
      <div class="dropdown-header" @click="toggleDropdown" @click.stop>
        {{ selectedArea.name || 'Sélectionner une région' }}
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
          <template v-for="(areas, region) in groupedAreas" :key="region">
    
    <!-- Région -->
    <li class="dropdown-region">
      {{ region }}
    </li>

    <!-- Zones -->
    <li
      v-for="area in areas"
      :key="area.name"
      @click="selectArea(area)"
      class="dropdown-item"
    >
      {{ area.name }}
    </li>

  </template>
          <!-- <li
            v-for="area in filteredAreas"
            :key="area.name"
            @click="selectArea(area.name)"
            class="dropdown-item"
          >
            {{ area.name }}
          </li> -->
          <li v-if="groupedAreas.length === 0" class="dropdown-no-result">
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
    justify-content: center;
    width: 300px;
    z-index: 2000;
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
    top: 6rem;
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
  
.dropdown-region {
  padding: 6px 8px;
  font-weight: bold;
  background-color: #111;
  color: #BCF4DE;
  cursor: default;
  border-top: 1px solid #333;
}

.dropdown-item {
  padding: 8px 16px; /* indentation visuelle */
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
  