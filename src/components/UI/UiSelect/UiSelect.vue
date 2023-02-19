<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, ref, resolveTransitionHooks, watch, withDefaults} from "vue";
import useModel from "../../../composition/useModel";
import useDropDown from "../../../composition/dropDown";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface ObjectKeyString {
  [key: string]: string | number
}
type Value = number | string | ObjectKeyString;
interface Option {
  label: string,
  value: Value,
  selected: boolean,
  index: number
}
interface Props {
  modelValue: Value | null | Value[];
  options: Value[];
  defaultOption?: boolean;
  multiple?: boolean;
  required?: boolean;
  label?: number | string;
  placeholder?: number | string;
  labelKey?: string;
  valueKey?: string;
  color?: string;
}
interface Emit {
  (e: 'update:modelValue', value: Value | Value[]): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: '',
  defaultOption: false,
  multiple: false,
  required: false,
  label: '',
  placeholder: '',
  labelKey: 'label',
  color: 'primary'
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const optionsContainer = ref<HTMLDivElement | null>(null);
let optionsIsOpen = ref<boolean>(false);

/* Composition */
// declare you composition api...
const model = useModel(props, emit);
const open = useDropDown(optionsContainer, optionsIsOpen, {});

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  defaultSelectValue()
})

/* Computed */
// you computational properties...
const selectedOptions = computed(() => {
  if (!model.value) return '';
  if(Array.isArray(model.value)) {
    return model.value.reduce((acc, item:Value, index) => {
      let label;
      switch(typeof item) {
        case "string":
        case "number":
          label = item.toString();
          break;
        case "object":
          label = item[props.labelKey];
          break;
      }
      if(index) acc += ', ';
      return acc + label;
    }, '' as string)
  }
  switch (typeof model.value) {
    case "object":
      return model.value[props.labelKey];
    default:
      return model.value
  }
})

const formattedOptions = computed(() => {
  return props.options.map(opt => {
    let option;
    switch (typeof opt) {
      case "string":
      case "number":
        option = formatPrimitiveToOption(opt);
        break;
      case "object":
        option = formatObjectToOption(opt);
        break;
    }
    const index = findOption(opt, model.value);
    option.selected = index >= 0;
    option.index = index;
    return option;
  })
})

function findOption (option: Value, selected: Value | null | Value[]) {
  if (!selected) return -1;

  if (!Array.isArray(selected)) selected = [selected]

  if (typeof option === 'object') {
    for (let i = 0; i < selected.length; i++) {
      if (isEqual(option, selected[i])) {
        return i;
      }
    }
  }
  let index = selected.indexOf(option);
  if (index >= 0) return index;

  return -1;
}

const classes = computed(():string[] => {
  const classes = ['ui-select__control__field'];
  if(optionsIsOpen.value) classes.push('ui-select__control__field--focus');
  if(props.color) classes.push(`ui-select__control__field--${props.color}`);
  return classes;
})

watch(model, () => {
  if(!props.defaultOption) return;
  if(!model.value) model.value = props.options[0];
})

/* Methods */
// promote your methods...
function defaultSelectValue() {
  if(!props.defaultOption) return;
  const value = props.options[0];
  model.value = props.multiple ? [value] : value;
}

function formatPrimitiveToOption(optData: string | number): Option {
  return {
    label: optData.toString(),
    value: optData.toString(),
    selected: false,
    index: -1,
  }
}

function formatObjectToOption(optData: ObjectKeyString): Option {
  return {
    label: optData[props.labelKey].toString(),
    value: props.valueKey? optData[props.valueKey] : optData,
    selected: false,
    index: -1,
  }
}

function updateMultipleValue(option:Option) {
  const value: Value = option.value;
  if(Array.isArray(model.value)) {
    if(option.selected) {
      model.value.splice(option.index, 1);
      return;
    }
    model.value = [...model.value, value];
    return;
  }
  if(option.selected)  {
    model.value = '';
    return;
  }
  model.value = [value];
}

function updateSingleValue(option:Option) {
  if (option.selected) {
    model.value = '';
    return
  }
  model.value = option.value
}

function selectOption(option:Option) {
  if(props.multiple) {
    updateMultipleValue(option);
    return;
  }
  updateSingleValue(option);
}

function switchOptionsVisible() {
  optionsIsOpen.value = !optionsIsOpen.value;
}

function emitOptions(value:Value | Value[]) {
  emit("update:modelValue", value);
}

function isEqual(value1:any, value2:any) {
  if(value1 === value2) return true;
  if(typeof value1 === 'object' && typeof value2 === 'object') {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if(keys1.length != keys2.length) return false;
    for(let i = 0; i < keys1.length; i++) {
      const key = keys1[i]
      const valuesIsEqual = isEqual(value1[key], value2[key]);
      if(!valuesIsEqual) {
        return false;
        break;
      }
    }
    return true;
  }
  return false
}
</script>

<template>
  <label class="ui-select" @click.prevent="switchOptionsVisible">
    <span v-if="required" v-text="`*`" class="ui-select__required" />
    <span v-if="label" v-text="label" class="ui-select__label" />
    <div class="ui-select__control">
      <div :class="classes">
        <div class="ui-select__control__field__text">
          <span v-if="placeholder && !selectedOptions" v-text="placeholder" class="ui-select__control__field__text__placeholder"/>
          <span v-text="selectedOptions"/>
        </div>
      </div>
      <div class="options-wrapper">
        <ul ref="optionsContainer" v-if="open" class="ui-select__control__options">
          <li
              v-for="(option, index) in formattedOptions"
              :key="index"
              v-text="option.label"
              class="ui-select__control__options__item"
              :class="{'ui-select__control__options__item--selected' : option.selected}"
              @click=selectOption(option)
          />
        </ul>
      </div>
    </div>
  </label>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...

.options-wrapper {
  position: relative;
}
.ui-select {
  font-size: 16px;
  width: 100%;


  &__required {
    color: $error;
    margin-right: 3px;
  }

  &__label {
    color: $text;
  }

  &__control {
    position: relative;
    cursor: pointer;

    &__field {
      overflow: hidden;
      position: relative;
      z-index: 101;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid $default;
      min-height: 64px;
      width: 100%;
      background-color: $base-white;
      transition: all 0.2s;

      &--success {
        border-color: $success;
      }
      &--error {
        border-color: $error;
      }

      &--primary:hover {
        border-color: $primary;
        transition: all 0.2s;
      }
      &--primary.ui-select__control__field--focus {
        border-color: $primary;
        transition: all 0.2s;

        .ui-select__control__field__btn {
          color: $primary;
          transform: rotate(180deg);
          transition: all 0.2s;
        }
      }

      &__icon {
        margin-right: 16px;
      }

      &__btn {
        margin-right: 16px;
        color: $default;
        transition: all 0.2s;
      }

      &__text {
        padding: 0 24px;

        &__placeholder {
          color: $text-40;
        }
      }
    }

    &__options {
      overflow: hidden;
      position: absolute;
      z-index: 100;
      top: -10px;
      width: 100%;
      list-style: none;
      border-top: none;
      padding-top: 10px;
      transition: all .2s;

      &__item {
        display: flex;
        align-items: center;
        color: $text;
        padding: 10px 24px;
        min-height: 48px;
        background-color: $base-white;
        transition: all 0.2s;

        &:hover {
          transition: all 0.2s;
          background-color: $default;
        }

        &--selected {
          background-color: $default;
          transition: all 0.2s;
        }
      }
    }
  }
}
</style>
