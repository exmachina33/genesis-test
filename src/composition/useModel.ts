import { computed } from "vue";

type Value = any;
type Callback = (value: Value) => Value;
interface Props {
    [key: string]: Value;
}

function useModel(
    props: Props,
    emit: any,
    name = "modelValue",
    callback?: Callback
) {
    const model = computed({
        get() {
            return props[name];
        },
        set(value: Value) {
            const newValue = callback ? callback(value) : value;
            emit(`update:${name}`, newValue);
        },
    });
    return model;
}

export default useModel;
