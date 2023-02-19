import {defineStore} from "pinia";
import {computed, ref} from "vue";

interface Entity {
    [key: string]: string | number
}

export const useEntitiesStore = defineStore('entitiesStore', () => {
    const entities = ref<Entity[]>([]);
    const selectedEntitiesName = ref<string>('all');

    const getEntities = computed(() => {
        if(selectedEntitiesName.value === 'all') return entities.value;
        return entities.value.filter(entity => entity.name === selectedEntitiesName.value);
    })

    function setEntities(items: Entity[] ) {
        entities.value = [...entities.value,...items]
    }
    function setSelectedEntitiesType(name:string ) {
        selectedEntitiesName.value = name;
    }

    return {
        entities,
        getEntities,
        setEntities,
        setSelectedEntitiesType
    }
})