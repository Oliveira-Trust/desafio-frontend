<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { TooltipProps } from '~/interfaces';

interface Props extends TooltipProps {
    variant?: 'dark' | 'light'
};

const props = withDefaults(defineProps<Props>(), {
    position: 'top',
    variant: 'dark',
    delay: 200
});

const isVisible = ref(false);
const tooltipRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

let showTimeout: NodeJS.Timeout | null = null;
let hideTimeout: NodeJS.Timeout | null = null;

const showTooltip = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    showTimeout = setTimeout(() => {
        isVisible.value = true;
    }, props.delay);
}

const hideTooltip = () => {
    if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
    };

    hideTimeout = setTimeout(() => {
        isVisible.value = false;
    }, 100);
};

const tooltipClasses = computed(() => [
    'absolute z-[9999] px-2 py-1 text-xs font-medium rounded-md shadow-lg transition-opacity duration-200 pointer-events-none whitespace-nowrap',
    props.variant === 'dark'
        ? 'bg-gray-800 text-white'
        : 'bg-white text-gray-900 border border-gray-200',
    props.position === 'top' ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-1' :
        props.position === 'bottom' ? 'top-full left-1/2 transform -translate-x-1/2 mt-1' :
            props.position === 'left' ? 'right-full top-1/2 transform -translate-y-1/2 mr-1' :
                'left-full top-1/2 transform -translate-y-1/2 ml-1'
]);

const arrowClasses = computed(() => [
    'absolute w-2 h-2 transform rotate-45',
    props.variant === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200',
    props.position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 -mt-1' :
        props.position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1' :
            props.position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 -ml-1' :
                'right-full top-1/2 transform -translate-y-1/2 -mr-1'
]);

onUnmounted(() => {
    if (showTimeout) clearTimeout(showTimeout);
    if (hideTimeout) clearTimeout(hideTimeout);
});
</script>

<template>
    <div class="relative inline-block" ref="triggerRef">
        <div @mouseenter="showTooltip" @mouseleave="hideTooltip" @focus="showTooltip" @blur="hideTooltip">
            <slot />
        </div>

        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isVisible" ref="tooltipRef" :class="tooltipClasses" role="tooltip">
                {{ text }}
                <div :class="arrowClasses"></div>
            </div>
        </Transition>
    </div>
</template>
