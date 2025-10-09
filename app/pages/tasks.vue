<script lang="ts" setup>
import { useTasksStore } from "@/stores/task";

const store = useTasksStore();

await store.init();
const tasks = computed(() => {
  return store.getFilteredTasks(store.getAcceptedTasks());
});
</script>

<template>
  <UContainer>
    <div class="flex justify-between">
      <p class="font-medium">Recent tasks</p>

      <TaskOrderBtn />
    </div>

    <p v-if="store.isPending">Загрузка...</p>
    <p v-if="!tasks.length && !store.isPending" class="text-center my-4">
      Not founded ;(
    </p>

    <TaskGrid :tasks />
  </UContainer>
</template>
