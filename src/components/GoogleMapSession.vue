<script setup lang="ts">

const props = defineProps({
  apiKey: { type: String, required: true },
  mapType: { type: String, default: 'roadmap' },
  language: { type: String, default: 'fr-FR' },
  code_regional: { type: String, default: 'IN' },
});

// état local
const session = ref(null);
const expiry = ref(null);
const tileWidth = ref(256);
const tileHeight = ref(256);
const emit = defineEmits(['loadingStatusChange']);

// création de session
async function createSession() {
  emit('loadingStatusChange', true);
  const url = `https://tile.googleapis.com/v1/createSession?key=${props.apiKey}`;

  const body = {
    mapType: props.mapType,
    language: props.language,
    region: props.code_regional,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Erreur createSession: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  session.value = data.session;
  expiry.value = parseInt(data.expiry);
  tileWidth.value = data.tileWidth;
  tileHeight.value = data.tileHeight;
  emit('loadingStatusChange', false);
}

// génère l’URL d’une tile
const tileUrl = computed(() => {
  if (!session.value) return null;
  return (
    `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}` +
    `?session=${session.value}` +
    `&key=${props.apiKey}`
  );
})

// init auto
onMounted(() => {
  createSession().catch((err) => console.error('GoogleMapSession init error', err));
});
onUpdated (() => {
  if (!session.value) {
    createSession().catch((err) => console.error('GoogleMapSession update error', err));
  }
});

watch(() => props.code_regional, (newVal, oldVal) => {
  createSession().catch((err) => console.error('GoogleMapSession watch error', err));
});
</script>

<template>
  <!--
    Le slot reçoit les données du composant parent.
    => Le parent peut directement consommer session, expiry, tileUrl
  -->
  <slot
    :session="session"
    :expiry="expiry"
    :tile-url="tileUrl"
    :tile-width="tileWidth"
    :tile-height="tileHeight"
  />
</template>
