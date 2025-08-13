<script setup lang="ts">
import type { WalletFormData, User } from '~/interfaces'
import { useUsersStore } from '~/stores/users'
import { validators, masks } from '~/utils'

interface Props {
	isOpen: boolean
	user: User | null
}

const props = defineProps<Props>();

const emit = defineEmits<{
	close: []
	submit: [data: WalletFormData]
}>();

const usersStore = useUsersStore();

const formData = ref<WalletFormData>({
	nome: '',
	sobrenome: '',
	email: '',
	valor_compra: ''
});

const errors = ref<Partial<WalletFormData>>({});
const isLoading = ref(false);

const btcValue = computed(() => {
	const valor = parseFloat(formData.value.valor_compra.replace(/\D/g, '')) / 100 || 0;
	return (valor / 50000).toFixed(5);
});

const handleCurrencyInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const maskedValue = masks.currency(target.value);
	formData.value.valor_compra = maskedValue;
};

const validateForm = (): boolean => {
	const validation = validators.walletForm(formData.value);
	errors.value = validation.errors;
	return validation.isValid;
};

const handleSubmit = async () => {
	if (!validateForm() || !props.user) {
		return;
	}

	isLoading.value = true;

	try {
		const userData = {
			id: props.user.id,
			nome: formData.value.nome.trim(),
			sobrenome: formData.value.sobrenome.trim(),
			email: formData.value.email.trim(),
			valor_carteira: parseFloat(formData.value.valor_compra.replace(/\D/g, '')) / 100
		};

		await usersStore.updateUser(userData);
		emit('submit', { ...formData.value });
		handleClose();
	} catch (error) {
		console.error('Erro ao atualizar usuário:', error);
		alert('Erro ao atualizar carteira. Tente novamente.');
	} finally {
		isLoading.value = false;
	}
};

const handleClose = () => {
	formData.value = {
		nome: '',
		sobrenome: '',
		email: '',
		valor_compra: ''
	};
	errors.value = {};
	emit('close');
};

watch(() => props.user, (newUser) => {
	if (newUser) {
		formData.value = {
			nome: newUser.nome,
			sobrenome: newUser.sobrenome,
			email: newUser.email,
			valor_compra: masks.currency((newUser.valor_carteira * 100).toString())
		};
		errors.value = {};
	}
}, { immediate: true });
</script>

<template>
	<AppModal :is-open="isOpen" title="Editar Carteira" size="lg" @close="handleClose">
		<form @submit.prevent="handleSubmit" class="space-y-4">
			<div>
				<AppInput 
					v-model="formData.nome" 
					label="Nome" 
					placeholder="Nome" 
					:class="{ 'border-red-500': errors.nome }"
				/>
				<div v-if="errors.nome" class="text-red-500 text-sm mt-1">{{ errors.nome }}</div>
			</div>

			<div>
				<AppInput 
					v-model="formData.sobrenome" 
					label="Sobrenome" 
					placeholder="Sobrenome"
					:class="{ 'border-red-500': errors.sobrenome }"
				/>
				<div v-if="errors.sobrenome" class="text-red-500 text-sm mt-1">{{ errors.sobrenome }}</div>
			</div>

			<div>
				<AppInput 
					v-model="formData.email" 
					label="E-mail" 
					type="email" 
					placeholder="E-mail"
					:class="{ 'border-red-500': errors.email }"
				/>
				<div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
			</div>

			<div class="flex items-end gap-4">
				<div class="flex-1">
					<AppInput 
						:model-value="formData.valor_compra" 
						label="Valor de compra" 
						type="text"
						placeholder="R$ 0,00"
						:class="{ 'border-red-500': errors.valor_compra }"
						@input="handleCurrencyInput"
					/>
					<div v-if="errors.valor_compra" class="text-red-500 text-sm mt-1">{{ errors.valor_compra }}</div>
				</div>
				<div class="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md border">
					BTC {{ btcValue }}
				</div>
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<AppButton 
					type="button" 
					variant="link" 
					@click="handleClose"
					:disabled="isLoading"
				>
					Cancelar
				</AppButton>
				<AppButton 
					type="submit"
					:disabled="isLoading"
				>
					<span v-if="isLoading" class="flex items-center gap-2">
						<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						Atualizando...
					</span>
					<span v-else>Atualizar</span>
				</AppButton>
			</div>
		</form>
	</AppModal>
</template>
