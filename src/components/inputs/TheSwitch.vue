
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['toggle'])

const isActive = ref(false);

const toggleSwitch = () => {
  isActive.value = !isActive.value;
  emit('toggle', isActive.value);
}
</script>

<template>
  <div class="toggle-switch" @click="toggleSwitch">
    <div class="toggle-slider" :class="{ active: isActive }"></div>
  </div>
</template>

<style scoped>
.toggle-switch {
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: #ccc;
  position: relative;
  cursor: pointer;
}

.toggle-slider {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s;
}

.toggle-slider.active {
  transform: translateX(30px);
}
</style>