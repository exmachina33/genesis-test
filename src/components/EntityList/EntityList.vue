<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from "vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Entity {
  [key: string]: string | number
}
interface Props {
  entities: Entity[];
}
interface Emit {
  (e: "update:modelValue", value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
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
  <ul class="entity-list">
    <li class="entity-list__item entity-list__item-first">
      <span class="entity-list__item-first__name">name</span>
      <span class="entity-list__item-first__name">id</span>
    </li>
    <li v-for="entity in entities" :key="entity.id" class="entity-list__item">
      <span v-text="entity.name" class="entity-list__item__name" />
      <span v-text="entity.id" class="entity-list__item__id"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.entity-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;

  &__item {
    display: flex;
    width: 100%;
    padding: 20px;

    &-first {
      background-color: $primary;
      color: $base-white;
    }

    span {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
