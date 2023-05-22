<script setup lang="ts">
import { ref, computed } from 'vue';

interface DateItem {
  date: string | null;
  day: string;
}

const emits = defineEmits(['update:from', 'update:to', 'update:isWeekday']);

const props = defineProps({
  from: {
    type: String as () => string | null,
    required: true
  },
  to: {
    type: String as () => string | null,
    required: true
  }
});

const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonthIndex = ref(currentDate.getMonth());
const displayedDates = computed(() => generateDates(currentYear.value, currentMonthIndex.value));

function generateDates(year: number, monthIndex: number): DateItem[] {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const dates: DateItem[] = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, monthIndex, i);
    dates.push({
      date: date.toISOString(),
      day: i.toString()
    });
  }

  // Add leading empty cells
  for (let i = 0; i < firstDay.getDay(); i++) {
    dates.unshift({ date: null, day: '' });
  }

  return dates;
}

const goToPreviousMonth = (): void => {
  if (currentMonthIndex.value === 0) {
    currentMonthIndex.value = 11;
    currentYear.value--;
  } else {
    currentMonthIndex.value--;
  }
}

const goToNextMonth = (): void => {
  if (currentMonthIndex.value === 11) {
    currentMonthIndex.value = 0;
    currentYear.value++;
  } else {
    currentMonthIndex.value++;
  }
}

const selectedDates = ref<DateItem[]>([]);

const selectDate = (date: DateItem): void => {
  if (isDisabled(date)) {
    return;
  }

  const existingIndex = selectedDates.value.findIndex((selectedDate) => selectedDate.date === date.date);

  if (existingIndex > -1) {
    selectedDates.value.splice(existingIndex, 1);
  } else {
    selectedDates.value.push(date);
  }

  if (selectedDates.value.length > 2) {
    selectedDates.value.shift();
  }

  const from = selectedDates.value[0]?.date || null;
  const to = selectedDates.value[1]?.date || null;
  const isWeekday = isWeekdaySelected();

  emits('update:from', from);
  emits('update:to', to);
  emits('update:isWeekday', isWeekday);
}

const isSelected = (date: DateItem): boolean => {
  return selectedDates.value.some((selectedDate) => selectedDate.date === date.date);
}

const isDisabled = (date: DateItem): boolean => {
  return date.date === null;
}

const currentMonth = computed(() => {
  return new Date(currentYear.value, currentMonthIndex.value).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
});

const isWeekdaySelected = (): boolean => {
  return selectedDates.value.some((selectedDate) => {
    const date = new Date(selectedDate.date || '');
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  });
};
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="goToPreviousMonth">&lt;</button>
      <span>{{ currentMonth }}</span>
      <button @click="goToNextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div
        v-for="date in displayedDates"
        :key="date.date"
        :class="['calendar-cell', { 'calendar-cell-selected': isSelected(date) }, { 'calendar-cell-disabled': isDisabled(date) }]"
        @click="selectDate(date)">
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.calendar-cell-selected {
  background-color: #ccc;
}

.calendar-cell-disabled {
  background-color: #f0f0f0;
  cursor: default;
}
</style>