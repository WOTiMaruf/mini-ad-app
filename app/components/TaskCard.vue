<script lang="ts" setup>
import type { LocalTask } from "@/types/task";
import { RATING_COLORS, URGENCY_COLORS } from "@/types/task";
import { formatDateRange } from "@/utils/date";
import { useTasksStore } from "@/stores/task";

const { setTaskAccepted } = useTasksStore();
const toast = useToast();

const { task } = defineProps<{ task: LocalTask }>();

const addTask = () => {
  setTaskAccepted(task.id, true);

  toast.add({
    title: "Task added",
    icon: "i-lucide-check",
    color: "success",
  });
};

const deleteTask = () => {
  setTaskAccepted(task.id, false);

  toast.add({
    title: "Task deleted",
    icon: "i-lucide-check",
    color: "success",
  });
};
</script>

<template>
  <UCard variant="outline" class="my-4">
    <template #header>
      <div class="flex justify-between items-center">
        <UUser
          :name="task.name"
          :avatar="{
            src: task.avatar,
            icon: 'i-lucide-image',
          }"
          size="lg"
        />

        <div class="flex h-min gap-x-2">
          <UBadge
            icon="i-lucide-flag"
            size="md"
            :color="URGENCY_COLORS[task.urgency]"
            variant="solid"
            :label="task.urgency"
          />

          <UBadge
            icon="i-lucide-star"
            size="md"
            :color="RATING_COLORS[task.rating]"
            variant="solid"
            :label="task.rating"
          />

          <TaskCardHeaderMenu
            :is-accepted="task.isAccepted"
            @add-task="addTask"
            @delete-task="deleteTask"
          />
        </div>
      </div>
    </template>

    <span class="font-bold text-2xl overflow-ellipsis whitespace-nowrap">
      {{ task.title }}
    </span>

    <div class="grid grid-cols-2">
      <div class="flex items-center gap-x-1">
        <UIcon name="i-lucide-users-round" />
        <span class="overflow-ellipsis whitespace-nowrap">
          {{ task.workplace }}
        </span>
      </div>

      <div class="flex items-center gap-x-1">
        <UIcon name="i-lucide-map-pin-check-inside" />
        <span class="overflow-ellipsis whitespace-nowrap">
          {{ task.location }}
        </span>
      </div>

      <div class="flex items-center gap-x-1">
        <UIcon name="i-lucide-calendar-fold" />
        <span class="overflow-ellipsis whitespace-nowrap">
          {{ formatDateRange(task.startDate, task.endDate) }}
        </span>
      </div>

      <div class="flex items-center gap-x-1">
        <UIcon name="i-lucide-hourglass" />
        <span class="overflow-ellipsis whitespace-nowrap">
          {{
            getDaysLeft(task.endDate) == 1
              ? "1 day"
              : `${getDaysLeft(task.endDate)} days`
          }}
        </span>
      </div>
    </div>
  </UCard>
</template>
