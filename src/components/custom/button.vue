<template>
    <button
        class="ot-button"
        :class="[cssClass]"
        :disabled="disabled"
        @click="$emit('click')"
        @mouseover="hover = true"
        @mouseleave="hover = false"
    >
        <span>
            <slot></slot>
        </span>
        <HalfCircleSpinner
            v-if="loading"
            :animation-duration="1000"
            :size="20"
            :color="spinnerColor"
            class="preloader-wrapper"
        />
    </button>
</template>
<script>
import { HalfCircleSpinner } from 'epic-spinners';
export default {
    components: {
        HalfCircleSpinner
    },
    name: 'Button',
    props: {
        variant: {
            // ot-blue, ot-blue-outline, ot-red
            type: String,
            default: 'ot-blue'
        },
        size: {
            // none = medium, extra-small, small, large and extra-large
            type: String,
            default: ''
        },
        block: {
            // button width 100%
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        positionFixed: {
            // Tipos de posições: top-left, top-right, bottom-left, bottom-right
            type: String,
            default: ''
        }
    },
    data () {
        return {
            hover: false
        };
    },
    computed: {
        cssClass () {
            return `${this.variant} ${this.size} ${this.blockClass} ${this.disabledClass} 
                    ${this.loadingClass} ${this.hoverClass}
                    ${this.positionFixedClass} ${this.fixedPosition}`;
        },
        blockClass () {
            return this.block ? 'block' : '';
        },
        disabledClass () {
            return this.disabled ? 'disabled' : '';
        },
        loadingClass () {
            return this.loading ? 'loading' : '';
        },
        hoverClass () {
            return this.hover && this.loading ? 'hover-class' : '';
        },
        spinnerColor () {
            if (this.disabledClass) {
                return '#707070';
            } else {
                switch (this.variant) {
                    case 'ot-blue':
                        return '#fff';
                    case 'ot-blue-outline':
                        return '#007bff';
                    default:
                        return '#000';
                }
            }
        },
        positionFixedClass () {
            if (this.positionFixed) {
                switch (this.positionFixed) {
                    case 'top-left':
                        return 'ot-top-left';
                    case 'top-right':
                        return 'ot-top-right';
                    case 'bottom-left':
                        return 'ot-bottom-left';
                    case 'bottom-right':
                        return 'ot-bottom-right';
                    default:
                        return '';
                }
            }
            return '';
        },
        fixedPosition () {
            if ((this.positionFixed == 'top-left' || this.positionFixed == 'top-right')) {
                return 'ot-top-with-header';
            }
            return '';
        },
    }
};
</script>

<style lang="scss" scoped>
.ot-button {
    font-size: 16px;
    font-weight: 600;
    padding: 9px 30px;
    border: none;
    border-radius: 3px;
    box-shadow: none !important;
    position: relative;
}

/* posição fixas */

.ot-button.ot-top-left {
    position: fixed;
    top: 30px;
    left: 20px;
    z-index: 1000;
}

.ot-button.ot-top-left.ot-top-with-header,
.ot-button.ot-top-right.ot-top-with-header {
    top: 70px;
}

.ot-button.ot-top-right {
    position: fixed;
    top: 30px;
    right: 20px;
    z-index: 1000;
}

.ot-button.ot-bottom-left {
    position: fixed;
    bottom: 30px;
    left: 20px;
    z-index: 1000;
}

.ot-button.ot-bottom-right {
    position: fixed;
    bottom: 30px;
    right: 20px;
    z-index: 1000;
}

/* UpperCase */
.ot-button.uppercase {
    text-transform: uppercase !important;
}

/* botão sombreado */
.ot-button.ot-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
}

/* BTN PRIMARY */
.ot-button.ot-blue {
    color: #fff;
    background-color: #007bff;
    text-transform: capitalize;
}

.ot-button.ot-blue.loading span {
    color: transparent;
}

.ot-button.ot-blue:hover {
    background-color: #0545f4;
}

/* BTN SECUNDARY */

.ot-button.ot-blue-outline {
    color: #007bff;
    background-color: #fff;
    box-shadow: inset 0px 0px 1px 1px #007bff !important;
    text-transform: capitalize;
}

.ot-button.ot-blue-outline:hover {
    background-color: #007bff;
    color: #ffffff;
}

.ot-button.ot-blue-outline.hover-class:hover {
    color: #007bff;
    background-color: #fff;
    box-shadow: inset 0px 0px 1px 1px #007bff !important;
    text-transform: capitalize;
}

.ot-button.ot-blue-outline.loading span {
    color: transparent;
}

// BTN RED

.ot-button.ot-red {
    color: #fff;
    background-color: #f7002a;
    text-transform: capitalize;
}

.ot-button.ot-red.loading span {
    color: transparent;
}

.ot-button.ot-red:hover {
    background-color: #f70029;
}

/* BUTTON  SIZES*/

/* SMALL */
.ot-button.small {
    padding: 4px 30px;
}

/* EXTRA SMALL */
.ot-button.extra-small {
    padding: 2px 30px;
}

/* LARGE */

.ot-button.large {
    padding: 14px 30px;
}

/* EXTRA LARGE */

.ot-button.extra-large {
    padding: 20px 30px;
    font-size: 18px;
}
/* SEND PROPOSAL */

.ot-button.send-proposal {
    height: 36px;
    font-size: 1rem;
}

/* BTN BLOCK */
.ot-button.block {
    width: 100%;
}

/* BTN DISABLED */

.ot-button.disabled {
    background-color: #dbdbdb !important;
    color: #707070 !important;
    cursor: not-allowed;
}

/* CUSTOM LOADING */

.ot-button .preloader-wrapper {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: calc(50% - 13px);
}

.ot-button.extra-small .preloader-wrapper {
    top: 3px;
}

.ot-button.small .preloader-wrapper {
    top: 5px;
}

.ot-button.large .preloader-wrapper {
    top: 15px;
}

.ot-button.extra-large .preloader-wrapper {
    top: 25px;
}
</style>
