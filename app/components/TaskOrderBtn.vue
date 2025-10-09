<script lang="ts" setup>
import { useTasksStore } from "@/stores/task";
import { debounce } from "#shared/utils/debounce";

const { filters, toggleSortOrder } = useTasksStore();

const updateSortOrder = debounce(() => toggleSortOrder(), 600);
</script>

<template>
  <UButton color="neutral" variant="subtle" size="lg" @click="updateSortOrder">
    <UIcon v-if="filters.sortOrder === 'asc'" name="i-lucide-arrow-down-a-z" />
    <UIcon v-else name="i-lucide-arrow-up-a-z" />
  </UButton>
</template>
