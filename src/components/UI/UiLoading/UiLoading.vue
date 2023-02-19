<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from "vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  loading?: boolean,
  color?: string
}
interface Emit {
  (e: "update:modelValue", value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  color: '#fff',
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <div v-if="loading" class="ui-loading">
    <span class="ui-loading__loader"></span>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$color: v-bind(color);

/* Selector */
// style component...
.ui-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 999999;
  top: 0;

  &__loader {
    width: 35px;
    height: 35px;
    border: 4px solid $color;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
