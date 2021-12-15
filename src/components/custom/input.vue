<template>
    <div class="input-component" :style="cssProps">
        <input
            class="text-input"
            :disabled="disabled"
            v-bind:v-model="value"
            :value="value"
            :type="inputType"
            :style="{
                'background-color': disabled ? '#F2F2F2' : backgroundColor,
                color: disabled ? '#A5A5A5' : '#000'
            }"
            v-on:input="$emit('input', $event.target.value)"
            @focus="focusInput"
            @blur="validate(), $emit('onblur')"
            v-on:keyup.enter="$emit('enter', true)"
        />
        <transition name="slide-fade">
            <p style="color: red" v-if="show">{{ messageError }}</p>
        </transition>
    </div>
</template>

<script>
import { validateInput } from '@/utils/rules/input';
export default {
    name: 'otInput',
    props: {
        valid: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inputType: {
            type: String,
            default: 'text'
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        placeholderText: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        backgroundColor: {
            type: String,
            default: '#FFF'
        },
        focusColor: {
            type: String,
            default: '#a5a5a5'
        },
    },
    data: () => ({
        show: false,
        sucess: false,
        focus: {
            target: false,
            color: ''
        },
        messageError: ''
    }),
    methods: {
        focusInput () {
            this.focus.color = this.show ? 'red' : this.focusColor;
            if (this.focus.target) {
                this.focus.target = false;
            } else {
                this.focus.target = true;
            }
        },
        validate () {
            if (!Object.keys(this.rules).length) {
                return false;
            }
            this.messageError = validateInput(this.rules, this.value);
            if (this.messageError.trim('').split('').length) {
                this.sucess = false;
                this.focus.color = '#ED4F4F';
                this.show = true;
            } else {
                this.focus.color = '';
                this.show = false;
                this.sucess = true;
            }
            this.$emit('valid', !this.show);
        }
    },
    computed: {
        cssProps () {
            return {
                '--colorInput': this.show ? 'red' : this.focusColor,
                '--colorCircle': this.show ? 'red' : '#007BFF',
                '--colorCircleText': this.show ? 'red' : 'none',
                '--borderColor': this.sucess ? '#68CE6C' : '#dbdbdb',
                '--focusColor': !this.disabled ? '1px solid #0ca0fd' : '1px solid #dbdbdb',
                '--focusShadowBox': !this.disabled
                    ? 'none'
                    : 'none'
            };
        }
    }
}
</script>

<style scoped lang="scss">
.input-component {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* padding-bottom: 10px; */
}
.input-component input:hover {
    border: var(--focusColor);
    box-shadow: var(--focusShadowBox);
}
.input-component .text-input {
    border: 1px solid var(--borderColor);
    border-radius: 3px;
    padding: 0;
    padding-left: var(--paddingLeftLink);
    line-height: 36px;
    width: 100%;
}
.input-component .text-input:focus {
    outline: none;
}
.row .input-field input:focus,
input.unit-price:focus,
.input-field input:focus {
    border: 1px solid var(--colorInput) !important;
}

.input-component .text-input::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    line-height: 19px;
}
</style>