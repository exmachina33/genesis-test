<script setup lang="ts">
import {computed, defineEmits, defineProps, withDefaults} from "vue";
import UiLoading from "../UiLoading/UiLoading.vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  label?: string | number;
  color?: string;
  outline?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  flat?: boolean;
  dense?: boolean;
  fill?: boolean;
  loading?: boolean;
}
interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "click", event: Event): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  label: '',
  color: 'primary',
  outline: false,
  disabled: false,
  rounded: false,
  flat: false,
  dense: false,
  fill: false,
  loading: false,

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
const classes = computed(():string[] => {
  const classes = ['ui-btn'];
  if(props.outline) {
    classes.push('ui-btn--outline');
  }
  if(props.rounded) {
    classes.push('ui-btn--rounded');
  }
  if(props.color) {
    classes.push(`ui-btn--${props.color}`);
  }
  if(props.flat) {
    classes.push('ui-btn--flat');
  }
  if(props.dense) {
    classes.push('ui-btn--dense');
  }
  if(props.disabled) {
    classes.push('ui-btn--disabled');
  }
  if(!props.disabled) {
    classes.push('ui-btn--active');
  }
  if(props.fill) {
    classes.push('ui-btn--fill');
  }
  if(props.loading) {
    classes.push('ui-btn--loading');
  }
  return classes;
})

/* Methods */
// promote your methods...
function clickEmit(event: Event) {
  emit('click', event)
}
</script>

<template>
  <button
      :class="classes"
      :disabled="disabled || loading"
      @click="clickEmit"
  >
    <slot v-if="!loading" name="before"/>
    <span v-if="label && !loading" class="ui-btn__label" v-text="label"/>
    <ui-loading :loading="loading"/>
    <slot v-if="!loading" name="after"/>
  </button>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.ui-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 16px;
  border: 1px solid rgba(0,0,0,0);
  gap: 10px;
  cursor: pointer;
  background-color: rgba(0,0,0,0);
  color: $text;
  padding: 0 64px;
  width: fit-content;

  &__label {
    margin: 0 14px;
  }

  &--primary {
    background-color: $primary;
    border-color: $primary;
    color: $base-white;
    transition: all 0.2s;

    &:hover.ui-btn--active {
      background-color: $primary-hover;
      border-color: $primary-hover;
      transition: all 0.2s;
    }
  }
  

  &--outline {
    background-color: inherit;
  }
  &--rounded {
    border-radius: 50%;
  }
  &--flat {
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
  }
  &--dense {
    height: auto;
    padding: 0;
  }
  &--fill {
    width: 100%;
  }
  &--loading {
    padding: 0 16px;
  }
  &--disabled {
    cursor: auto;
    background-color: $disabled;
    border-color: $disabled;
  }
}
.ui-btn--primary.ui-btn--outline,
.ui-btn--primary.ui-btn--flat {
  color: $primary;
}
</style>
