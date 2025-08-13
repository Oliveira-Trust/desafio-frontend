<script setup lang="ts">
import type { ModalProps } from '~/interfaces'

interface Props extends ModalProps { }

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
});

const emit = defineEmits<{
	close: []
}>();

const handleBackdropClick = (event: Event) => {
	if (event.target === event.currentTarget) {
		emit('close');
	}
};

const handleEscapeKey = (event: KeyboardEvent) => {
	if (event.key === 'Escape') {
		emit('close');
	}
};

onMounted(() => {
	document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
	document.removeEventListener('keydown', handleEscapeKey);
});

watch(() => props.isOpen, (isOpen) => {
	if (isOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
	}
});

onUnmounted(() => {
	document.body.style.overflow = '';
});
</script>

<template>
	<Teleport to="body">
		<Transition name="modal">
			<div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div class="fixed inset-0 bg-black bg-opacity-50" @click="handleBackdropClick"></div>

				<div :class="[
					'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full',
					size === 'sm' ? 'max-w-md' :
						size === 'md' ? 'max-w-lg' :
							size === 'lg' ? 'max-w-2xl' :
								size === 'xl' ? 'max-w-4xl' :
									'max-w-lg'
				]">
					<div class="p-6 sm:p-12">
						<div class="flex items-center justify-between mb-4">
							<h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ title }}</h2>
						</div>

						<div class="border-t border-gray-200 mb-6"></div>

						<slot />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
	transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
	transform: scale(0.9);
}
</style>
