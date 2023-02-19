<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, ref, watch} from "vue";
import UiSelect from "../components/UI/UiSelect/UiSelect.vue";
import UiButton from "../components/UI/UiButton/UiButton.vue";
import UiTabs from "../components/UI/UiTabs/UiTabs.vue";
import UiTabsPanel from "../components/UI/UiTabsPanel/UiTabsPanel.vue";
import {createEntity, getEntity} from "../api";
import {useEntitiesStore} from "../store/EntitiesStore";
import EntityList from "../components/EntityList/EntityList.vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Entity {
  [key: string]: string | number
}
interface Emit {
  (e: "update:modelValue", value: string): void;
}

/* Props */
// property default value...


/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const entitiesStore = useEntitiesStore()
const options = [
  { label: 'Не выбрано', value: '' },
  { label: 'Сделка', value: 'leads' },
  { label: 'Контакт', value: 'contacts' },
  { label: 'Компания', value: 'companies' }
]
const value = ref({ label: 'Не выбрано', value: '' });
const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Сделки', value: 'leads' },
  { label: 'Контакты', value: 'contacts' },
  { label: 'Компании', value: 'companies' }
]
const activeTab = ref('all' );
const loading = ref(false);

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...


/* Computed */
// you computational properties...
const buttonIsDisabled = computed(() => {
  return value.value.value ? false : true;
})

const entitiesList = computed(() => {
  return entitiesStore.getEntities
})


watch(activeTab, () => {
  entitiesStore.setSelectedEntitiesType(activeTab.value);
})

/* Methods */
// promote your methods...
async function create() {
  loading.value = true;
  const type = value.value.value;
  const url = `https://d6757be6f1100.amocrm.ru/api/v4/${type}`;
  const res = await createEntity(url, [{name: type}]);
  const createdDataList: Entity[] = res._embedded[type];
  const createdList: Entity[] = [];
  for (let i = 0; i < createdDataList.length; i++) {
    const id = createdDataList[i].id;
    const entity = await getEntity(`${url}/${id}`);
    createdList.push(entity)
  }
  entitiesStore.setEntities(createdList)
  loading.value = false;
}

</script>

<template>
  <div class="main-view">
    <div class="main-view__content">
      <div class="main-view__content__select">
        <ui-select v-model="value" :options="options" default-option/>
        <ui-button label="Создать" :disabled="buttonIsDisabled" @click="create" :loading="loading"/>
      </div>

      <div class="main-view__content__entities">
        <ui-tabs v-model="activeTab" :tabs="tabs" fill class="main-view__content__entities__tabs"/>
        <ui-tabs-panel v-model="activeTab" class="main-view__content__entities__list">
          <template v-slot:all>
            <entity-list :entities="entitiesList"/>
          </template>
          <template v-slot:leads>
            <entity-list :entities="entitiesList"/>
          </template>
          <template v-slot:contacts>
            <entity-list :entities="entitiesList"/>
          </template>
          <template v-slot:companies>
            <entity-list :entities="entitiesList"/>
          </template>
        </ui-tabs-panel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.main-view {
  padding: 0 calc(50% - 400px);

  &__content {
    display: flex;
    padding: 40px 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    &__select {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 20px;
    }

    &__entities {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      gap: 20px;

      &__tabs {
        width: 100%;
      }
      &__list {
        width: 100%;
      }
    }
  }
}
@media (max-width: 600px) {
  .main-view__content {
    padding: 20px 5px;

    &__select {
      flex-direction: column;
    }
  }
}
</style>
