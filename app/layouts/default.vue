<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Tasks",
    to: "/tasks",
    active: route.path.startsWith("/tasks"),
  },
  {
    label: "Requests",
    to: "/requests",
    active: route.path.startsWith("/requests"),
  },
]);
</script>

<template>
  <div>
    <OflineBanner />

    <UNavigationMenu
      :items="items"
      variant="link"
      :highlight="true"
      class="w-full justify-center bg-white border-b border-black/5"
    />

    <SearchBar />

    <UMain class="py-4">
      <slot />
    </UMain>
  </div>
</template>
