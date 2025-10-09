<script lang="ts" setup>
import { useTasksStore } from "#imports";
import { debounce } from "#shared/utils/debounce";

import type { TaskSortByKeys } from "@/types/task";

const { filters, setSearchFilter } = useTasksStore();

const updateSearch = debounce((value: string) => {
  setSearchFilter(value);
}, 500);

const items = [
  { label: "Title", value: "title" },
  { label: "Workplace", value: "workplace" },
  { label: "Location", value: "location" },
  { label: "Start date", value: "startDate" },
  { label: "Duration", value: "endDate" },
  { label: "Name", value: "name" },
  { label: "Rating", value: "rating" },
  { label: "Urgency", value: "urgency" },
] as const satisfies { label: string; value: TaskSortByKeys }[];
</script>

<template>
  <div class="flex gap-x-3 bg-white p-4 shadow">
    <UInput
      :model-value="filters.search"
      size="xl"
      trailing-icon="i-lucide-search"
      placeholder="Search tasks..."
      class="w-full"
      @update:model-value="updateSearch"
    >
      <template v-if="filters.search?.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="lg"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="filters.search = ''"
        />
      </template>
    </UInput>

    <UModal title="Filters">
      <UButton
        color="neutral"
        variant="subtle"
        size="lg"
        icon="i-lucide-list-filter"
      />

      <template #body>
        <div class="grid gap-2">
          <label for="sort-by" class="text-xs font-bold">Sorted by</label>
          <USelect id="sort-by" v-model="filters.sortBy" :items />
        </div>
      </template>
    </UModal>
  </div>
</template>
