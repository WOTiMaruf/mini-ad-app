<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const emit = defineEmits(["addTask", "deleteTask"]);
const { isAccepted } = defineProps<{ isAccepted: boolean }>();

const items: DropdownMenuItem[] = [
  {
    label: "Add task",
    icon: "i-lucide-plus",
    color: "neutral",
    onClick: () => emit("addTask"),
    class: isAccepted ? "hidden" : "",
  },
  {
    label: "Delete task",
    icon: "i-lucide-trash-2",
    color: "error",
    onClick: () => emit("deleteTask"),
    class: !isAccepted ? "hidden" : "",
  },
];
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-ellipsis-vertical"
    />
  </UDropdownMenu>
</template>
