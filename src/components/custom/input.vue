<template>
    <div class="input-component flex flex-col" :style="cssProps">
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
            :placeholder="placeholderText"
            v-money="validateMoney()"
        />
        <transition name="slide-fade">
            <div class="error-message flex justify-start" v-if="show">{{ messageError }}</div>
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
        hasMoney: {
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
    },
    data: () => ({
        show: false,
        sucess: false,
        focus: {
            target: false,
            color: ''
        },
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false
        },
        messageError: ''
    }),
    methods: {
        validateMoney () {
            return this.hasMoney ? this.money : false;
        },
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
        },
        colorInput () {
            if (this.sucess) {
                return '#68CE6C'
            }
            else if (this.show) {
                return 'red'
            }
            else {
                return '#dbdbdb'
            }
        }
    },
    computed: {
        cssProps () {
            return {
                '--borderColor': this.colorInput(),
                '--focusColor': !this.disabled ? '1px solid #0ca0fd' : '1px solid #dbdbdb',
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
}
.input-component .text-input {
    border: 1px solid var(--borderColor);
    border-radius: 3px;
    padding: 0;
    padding-left: 18px;
    line-height: 36px;
    width: 100%;
}
.input-component .text-input:focus {
    outline: none;
}

.input-component .text-input::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    line-height: 19px;
}

.error-message {
    color: red;
    width: 100%;
}

// Animation

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>