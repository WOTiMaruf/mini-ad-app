<script lang="ts" setup>
import type { LocalTask } from "@/types/task";

defineProps<{ tasks: LocalTask[] }>();
</script>

<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition-[transform,opacity] duration-500"
    move-class="transition-all duration-500 ease-in-out"
    enter-from-class="scale-0 opacity-0"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-[transform,opacity] duration-500 absolute"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-0"
  >
    <TaskCard v-for="task in tasks" :key="task.id" :task />
  </TransitionGroup>
</template>
