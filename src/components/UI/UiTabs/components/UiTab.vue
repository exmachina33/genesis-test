<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, computed } from "vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  label: string;
  value: string | number;
  active?: boolean;
  fill?: boolean;
}
interface Emit {
  (e: "click", value: string | number): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  active: false,
  fill: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const classes = computed(() => {
  return {
    active: props.active,
    fill: props.fill,
  };
});

/* Methods */
// promote your methods...
function clickHandler() {
  emit("click", props.value);
}
</script>

<template>
  <li class="ui-tab" :class="classes" @click="clickHandler">
    <span class="ui-tab__label" v-text="label" />
  </li>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.ui-tab {
  cursor: pointer;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 4px;
    width: 100%;
    background: $default;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 4px;
    width: 0;
    background: $primary;
    transition: all 0.3s;
  }
  .ui-tab__label {
    font-size: 16px;
    font-weight: 700;
    color: $text;
    padding: 0 8px 16px;
    transition: all 0.3s;
  }
}

.ui-tab.active {
  &::after {
    width: 100%;
  }
  .ui-tab__label {
    color: $text;
  }
}

.ui-tab.fill {
  width: 100%;
}
</style>
