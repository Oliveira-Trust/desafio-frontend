<script setup lang="ts">
import type { WalletFormData } from '~/interfaces'
import { useUsersStore } from '~/stores/users'
import { validators, masks } from '~/utils'
import { currencyService } from '~/services/currency'

interface Props {
	isOpen: boolean
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
	valor_compra: '',
	moeda_origem: 'BRL',
	moeda_destino: 'BTC'
});

const errors = ref<Partial<WalletFormData>>({});
const isLoading = ref(false);
const conversionResult = ref<{ amount: number; convertedAmount: number; rate: number } | null>(null);

const convertedValue = computed(() => {
	if (!conversionResult.value) return '0.00000';
	return conversionResult.value.convertedAmount.toFixed(5);
});

const handleCurrencyInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const maskedValue = masks.currency(target.value);
	formData.value.valor_compra = maskedValue;
	performConversion();
};

const performConversion = async () => {
	if (!formData.value.valor_compra) {
		conversionResult.value = null;
		return;
	}

	const amount = parseFloat(formData.value.valor_compra.replace(/\D/g, '')) / 100;
	if (amount <= 0) {
		conversionResult.value = null;
		return;
	}

	try {
		const result = await currencyService.convertCurrency(
			'BRL',
			'BTC',
			amount
		);
		conversionResult.value = result;
	} catch (error) {
		console.error('Erro na conversão:', error);
		conversionResult.value = null;
	}
};

const validateForm = (): boolean => {
	const validation = validators.walletForm(formData.value);
	errors.value = validation.errors;
	return validation.isValid;
};

const handleSubmit = async () => {
	if (!validateForm()) {
		return;
	}

	isLoading.value = true;

	try {
		const userData = {
			nome: formData.value.nome.trim(),
			sobrenome: formData.value.sobrenome.trim(),
			email: formData.value.email.trim(),
			valor_carteira: conversionResult.value ? conversionResult.value.convertedAmount : 0,
			moeda_origem: 'BRL',
			moeda_destino: 'BTC'
		};

		await usersStore.addUser(userData);
		emit('submit', { ...formData.value });
		handleClose();
	} catch (error) {
		console.error('Erro ao adicionar usuário:', error);
		alert('Erro ao adicionar carteira. Tente novamente.');
	} finally {
		isLoading.value = false;
	}
};

const handleClose = () => {
	formData.value = {
		nome: '',
		sobrenome: '',
		email: '',
		valor_compra: '',
		moeda_origem: 'BRL',
		moeda_destino: 'BTC'
	};
	errors.value = {};
	conversionResult.value = null;
	emit('close');
};
</script>

<template>
	<AppModal :is-open="isOpen" title="Adicionar Carteira" size="lg" @close="handleClose">
		<form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
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

			<div class="flex flex-col sm:flex-row sm:items-end gap-4">
				<div class="flex-1">
					<AppInput 
						:model-value="formData.valor_compra" 
						label="Valor de compra (BRL)" 
						type="text"
						placeholder="R$ 0,00"
						:class="{ 'border-red-500': errors.valor_compra }"
						@input="handleCurrencyInput"
					/>
					<div v-if="errors.valor_compra" class="text-red-500 text-sm mt-1">{{ errors.valor_compra }}</div>
				</div>
				<div class="text-sm text-gray-600 bg-gray-50 px-3 py-3 sm:py-2 rounded-md border min-w-full sm:min-w-[120px] text-center sm:text-left">
					BTC {{ convertedValue }}
				</div>
			</div>

			<div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
				<AppButton 
					type="button" 
					variant="link" 
					@click="handleClose"
					:disabled="isLoading"
					class="order-2 sm:order-1"
				>
					Cancelar
				</AppButton>
				<AppButton 
					type="submit"
					:disabled="isLoading"
					class="order-1 sm:order-2"
				>
					<span v-if="isLoading" class="flex items-center gap-2">
						<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						Adicionando...
					</span>
					<span v-else>Adicionar</span>
				</AppButton>
			</div>
		</form>
	</AppModal>
</template>
