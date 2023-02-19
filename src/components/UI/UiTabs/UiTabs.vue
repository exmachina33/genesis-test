<script setup lang="ts">
import { defineProps, defineEmits, computed, withDefaults } from "vue";

/* Composition */
// import you composition api...
import useModel from "../../../composition/useModel";

/* Components */
// import you components...
import UiTab from "./components/UiTab.vue";

/* Types */
// declare components component...
type Value = number | string | null;
interface Option {
  label: string;
  value: string;
}
interface Props {
  tabs: Option[];
  modelValue: Value;
  fill?: boolean;
}
interface Emit {
  (e: "update:modelValue", value: Value): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  fill: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit);

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function isActive(tab: Option) {
  return model.value && model.value === tab.value;
}

function changeTab(value: Value) {
  emit("update:modelValue", value);
}
</script>

<template>
  <ul class="ui-tab-panel">
    <ui-tab
      v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :active="isActive(tab)"
      :fill="fill"
      @click="changeTab"
    />
  </ul>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.ui-tab-panel {
  display: flex;
}
</style>
