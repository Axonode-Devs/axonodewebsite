<template>
  <div class="divider">
    <span v-if="$slots.default || label" class="divider-content">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* The Left Line */
.divider::before {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, #d1d5db);
}

/* The Right Line */
.divider::after {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(to left, transparent, #d1d5db);
}

/* Text Container Styling */
.divider-content {
  margin: 0 1.25rem;
  /* Keeps text from being too "bright" compared to the faded lines */
  color: #374151; 
}

/* Dark Mode adjustment (Optional) */
@media (prefers-color-scheme: dark) {
  .divider::before {
    background: linear-gradient(to right, transparent, #4b5563);
  }
  .divider::after {
    background: linear-gradient(to left, transparent, #4b5563);
  }
  .divider-content {
    color: #9ca3af;
  }
}
</style>