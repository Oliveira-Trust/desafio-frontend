<script setup lang="ts">
import type { User } from '~/interfaces'
import { useUsersStore } from '~/stores/users'

interface Props {
	isOpen: boolean
	user: User | null
}

const props = defineProps<Props>();

const emit = defineEmits<{
	close: []
	confirm: [user: User]
}>();

const usersStore = useUsersStore();
const isLoading = ref(false);

const handleConfirm = async () => {
	if (!props.user) return;

	isLoading.value = true;

	try {
		await usersStore.deleteUser(props.user.id);
		emit('confirm', props.user);
		handleClose();
	} catch (error) {
		console.error('Erro ao excluir usuário:', error);
		alert('Erro ao excluir carteira. Tente novamente.');
	} finally {
		isLoading.value = false;
	}
};

const handleClose = () => {
	emit('close');
};
</script>

<template>
	<AppModal :is-open="isOpen" title="Excluir Carteira" size="md" @close="handleClose">
		<div class="text-center space-y-6">
			<div class="flex justify-center">
				<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
					<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
						</path>
					</svg>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-semibold text-gray-900">Excluir Carteira</h3>
				<p class="text-gray-600">
					Tem certeza que deseja excluir essa Carteira?
				</p>
				<p class="text-gray-600">
					Esta ação não poderá ser desfeita.
				</p>
			</div>

			<div class="flex flex-col gap-3 pt-4">
				<AppButton 
					type="button"
					variant="danger"
					@click="handleConfirm"
					:disabled="isLoading"
					class="w-full"
				>
					<span v-if="isLoading" class="flex items-center justify-center gap-2">
						<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						Excluindo...
					</span>
					<span v-else>Excluir</span>
				</AppButton>
				<AppButton 
					type="button" 
					variant="link" 
					@click="handleClose"
					:disabled="isLoading"
					class="w-full"
				>
					Cancelar
				</AppButton>
			</div>
		</div>
	</AppModal>
</template>
