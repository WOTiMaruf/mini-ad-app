<script lang="ts" setup>
const online = useState("online", () => navigator.onLine);

const update = () => (online.value = navigator.onLine);

window.addEventListener("online", update);
window.addEventListener("offline", update);
</script>

<template>
  <UBanner
    v-show="!online"
    icon="i-lucide-info"
    title="You are offline. Using cached data"
    color="info"
  />
</template>
