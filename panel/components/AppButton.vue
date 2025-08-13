<script setup lang="ts">
import type { ButtonProps } from '~/interfaces'

interface Props extends ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'link'
};

const props = withDefaults(defineProps<Props>(), {
	variant: 'primary',
	size: 'md',
	disabled: false
});
</script>

<template>
	<button :class="[
		'font-medium text-sm transition-all duration-200 rounded-md touch-manipulation',
		size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-6 py-4 sm:py-3 text-base sm:text-lg md:text-sm' : 'px-4 py-3 sm:py-2 text-base sm:text-sm',
		variant === 'primary' ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 text-white disabled:bg-blue-400 disabled:cursor-not-allowed' :
			variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed' :
				variant === 'outline' ? 'bg-transparent hover:bg-blue-100 text-blue-600 border border-blue-600 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed' :
					variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400 disabled:cursor-not-allowed' :
						variant === 'link' ? 'text-blue-600 hover:text-blue-700 disabled:text-blue-400 disabled:cursor-not-allowed' :
							'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:cursor-not-allowed'
	]" :disabled="disabled">
		<slot />
	</button>
</template>
