import {
    Ref,
    WritableComputedRef,
    watch,
    nextTick,
    ref,
    watchEffect,
} from "vue";

interface DropdownConfig {
    maxHeight?: string | number;
    duration?: number;
}

function useDropDown(
    el: Ref<HTMLDivElement | null> | null,
    model: Ref<boolean>,
    config: DropdownConfig = {}
) {
    const open = ref(false);

    watchEffect(() => {
        if (!el?.value) return;
        setMainStyle(el.value);
        setEvent(el.value);
    });

    watch(model, (value) => {
        value ? showContent() : hiddenContent();
    });

    // Открытие контента
    async function showContent() {
        open.value = true;
        await nextTick();
        const height = getMaxHeight();
        setHeight(height);
    }
    // Закрытие контента
    function hiddenContent() {
        setOverflow("hidden");
        setHeight(0);
    }
    // Обработчик окончания анимации
    function transitionendHandler() {
        if (model.value) {
            setOverflow("auto");
            return;
        }
        open.value = false;
    }

    function leadToPixel(value: any) {
        switch (typeof value) {
            case "number":
                return `${value}px`;
            default:
                return value;
        }
    }
    // Получаем максимально возможную высоту контента
    function getMaxHeight() {
        if (!el) {
            console.error("DOM element not found");
            return 0;
        }
        const element = el.value as HTMLDivElement;
        const fullHeight = element.scrollHeight;
        const { maxHeight } = config;
        window.getComputedStyle(element, null).getPropertyValue("height");

        if (maxHeight && maxHeight < fullHeight) {
            return maxHeight;
        }
        return fullHeight;
    }
    // Установка события окончания анимации
    function setEvent(el: HTMLDivElement) {
        el.addEventListener("transitionend", transitionendHandler);
    }
    // Установка высоты для элемента
    function setHeight(height: string | number) {
        if (!el) {
            console.error("DOM element not found");
            return 0;
        }
        const element = el.value as HTMLDivElement;
        element.style.height = leadToPixel(height);
    }
    // Установка overflow для элемента
    function setOverflow(value: string) {
        if (!el?.value) {
            console.error("DOM element not found");
            return;
        }
        const element = el.value as HTMLDivElement;
        element.style.overflow = value;
    }
    // Установка основных стилий для элкмента
    function setMainStyle(el: HTMLDivElement) {
        const duration = config.duration || 200;
        el.style.transition = "height";
        el.style.transitionDuration = `${duration}ms`;
        setHeight(0);
        setOverflow("hidden");
    }

    return open;
}

export default useDropDown;