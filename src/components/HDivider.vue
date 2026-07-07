<template>
  <div class="divider">
    <span v-if="$slots.default || label" class="divider-content">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  topMargin: {
    type: String,
    default: '1.25rem'
  },
  bottomMargin: {
    type: String,
    default: '1.25rem'
  }
});
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: v-bind('props.topMargin');
  margin-bottom: v-bind('props.bottomMargin');
  color: #313131;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.divider::before {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, #929292);
}

.divider::after {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(to left, transparent, #929292);
}

.divider-content {
  margin: 0 1.25rem;
  color: #222222; 
}

</style>