<script lang="ts" setup>
import { useTasksStore } from "@/stores/task";
import TaskOrderBtn from "~/components/TaskOrderBtn.vue";

const store = useTasksStore();

await store.init();
const tasks = computed(() => {
  return store.getFilteredTasks(store.getUnAcceptedTasks());
});
</script>

<template>
  <UContainer>
    <div class="flex justify-between">
      <div class="font-medium">
        <span>All tasks</span>
        <UBadge
          :label="tasks.length"
          variant="soft"
          class="rounded-full ml-1"
        />
      </div>

      <TaskOrderBtn />
    </div>

    <p v-if="store.isPending">Загрузка...</p>
    <p v-if="!tasks.length && !store.isPending" class="text-center my-4">
      Not founded ;(
    </p>

    <TaskGrid :tasks />
  </UContainer>
</template>
