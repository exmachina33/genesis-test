<script setup lang="ts">
import { defineProps, withDefaults, ref, computed, defineEmits } from "vue";


/* Composition */
import useModel from "../../../composition/useModel";

/* Components */
// import you components...

/* Types */
// declare components component...
type Value = number | string | null;
interface Props {
  modelValue: Value;
}
interface Emit {
  (e: "update:modelValue", value: Value): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit);

/* Data */
// declare reactive variables...
const transition = ref<boolean>(false);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const classes = computed(() => {
  return { transition: transition.value };
});

/* Methods */
// promote your methods...
function enter() {
  transition.value = false;
}
function leave() {
  transition.value = true;
}
</script>

<template>
  <div class="ui-tabs-panel" :class="classes">
    <transition name="tabs" @after-enter="enter" @before-leave="leave">
      <slot :name="model" />
    </transition>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.ui-tabs-panel {
  display: flex;
  .tabs-enter-active,
  .tabs-leave-active {
    transition: all 0.5s ease;
  }
  .tabs-enter-from {
    transform: translateX(100%);
  }
  .tabs-leave-to {
    position: absolute;
    transform: translateX(-100%);
  }
}
.ui-tabs-panel.transition {
  position: relative;
  overflow: hidden;
}
</style>
