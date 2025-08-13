<script setup lang="ts">
import type { WalletFormData } from '~/interfaces'

interface Props {
	isOpen: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
	close: []
	submit: [data: WalletFormData]
}>();

const formData = ref<WalletFormData>({
	nome: '',
	sobrenome: '',
	email: '',
	valor_compra: ''
});

const btcValue = computed(() => {
	const valor = parseFloat(formData.value.valor_compra) || 0
	return (valor / 50000).toFixed(5)
});

const handleSubmit = () => {
	if (formData.value.nome && formData.value.sobrenome && formData.value.email && formData.value.valor_compra) {
		emit('submit', { ...formData.value });

		handleClose();
	}
};

const handleClose = () => {
	formData.value = {
		nome: '',
		sobrenome: '',
		email: '',
		valor_compra: ''
	};

	emit('close');
};
</script>

<template>
	<AppModal :is-open="isOpen" title="Adicionar Carteira" size="lg" @close="handleClose">
		<form @submit.prevent="handleSubmit" class="space-y-4">
			<AppInput v-model="formData.nome" label="Nome" placeholder="Nome" required />

			<AppInput v-model="formData.sobrenome" label="Sobrenome" placeholder="Sobrenome" required />

			<AppInput v-model="formData.email" label="E-mail" type="email" placeholder="E-mail" required />

			<div class="flex items-end gap-4">
				<div class="flex-1">
					<AppInput v-model="formData.valor_compra" label="Valor de compra" type="number"
						placeholder="Valor de compra" required />
				</div>
				<div class="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md border">
					BTC {{ btcValue }}
				</div>
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<AppButton type="button" variant="outline" @click="handleClose">
					Cancelar
				</AppButton>
				<AppButton type="submit">
					Adicionar
				</AppButton>
			</div>
		</form>
	</AppModal>
</template>
