<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	label: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: 'text'
	},
	required: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue']);

const inputId = computed(() => `input-${props.label.toLowerCase().replace(/\s+/g, '-')}`);
const isFocused = ref(false);
const hasValue = computed(() => props.modelValue && props.modelValue.toString().length > 0);

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};

const handleFocus = () => {
	isFocused.value = true;
};

const handleBlur = () => {
	isFocused.value = false;
};
</script>

<template>
	<div class="relative">
		<input 
			:id="inputId" 
			:type="type" 
			:value="modelValue" 
			:required="required"
			:disabled="disabled" 
			@input="handleInput" 
			@focus="handleFocus" 
			@blur="handleBlur"
			:class="[
				'w-full px-3 py-3 pt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed peer text-base',
				hasValue ? 'border-blue-600' : 'border-gray-300'
			]" 
		/>
		<label 
			:for="inputId" 
			:class="[
				'absolute top-4 top-4 left-3 transition-all duration-200 pointer-events-none',
				(isFocused || hasValue)
					? 'top-[4px] left-2 text-xs text-blue-600 px-1'
					: 'top-3 top-2 text-sm text-gray-500'
			]"
		>
			{{ label }}
		</label>
	</div>
</template>
