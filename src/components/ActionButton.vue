<template>
  <button @click="$emit('click')" :class="buttonClass" class="text-white px-3 py-1 rounded transition duration-300">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  buttonClass: String,
});
</script>
