<template>
  <component
    :is="type"
    :style="styleObject"
    :type="submit"
    @click="click"
    :class="['btn', size, state, variation]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "App-Button",
  methods: {
    click($event) {
      this.$emit("click", $event);
    },
  },
  props: {
    type: {
      type: String,
      default: "button",
      validator: (value) => {
        return value.match(/(button|a)/);
      },
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => {
        return value.match(/(small|medium|large)/);
      },
    },
    submit: {
      type: String,
      default: "button",
      validator: (value) => {
        return value.match(/(submit|button|reset)/);
      },
    },
    styleObject: {
      type: Object,
      default: () => {},
    },
    state: {
      type: String,
      default: null,
      validator: (value) => {
        return value.match(/(hover|active|focus|error)/);
      },
    },
    variation: {
      type: String,
      default: null,
      validator: (value) => {
        return value.match(/(primary|secondary|default|icone)/);
      },
    },
  },
};
</script>

<style  scoped>
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.25rem;
  border: 0;
  background: transparent;
}

.btn.small {
  font-size: var(--size-s);
}

.btn.medium {
  font-size: var(--size-m);
}

.btn.large {
  font-size: var(--size-l);
}

.btn.primary.error {
  border: 1px solid var(--color-error);
  background-color: var(--color-error);
  color: #fff;
}

.btn.primary.error:hover {
  box-shadow: 1px 1px 4px 1px rgb(255 30 30 / 85%);;
  background: rgb(255 30 30 / 85%);;
  color: #fff;
}

.btn.primary {
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  color: #fff;
}

.btn.primary:hover {
  box-shadow: 1px 1px 4px 1px rgb(30 139 255);
  background: rgb(30 139 255 / 85%);
}

.btn.icone {
  border-radius: var(--radius-circle);
  padding: 0.3rem;
  margin-left: 0.3rem;
}

.btn.icone:hover {
  background-color: var(--color-white);
  filter: brightness(0.9);
}

.btn.secondary {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  font-weight: var(--weight-bold);
}

.btn.secondary:hover {
  background: rgb(30 139 255 / 3%);
  filter: brightness(0.9);
}

.btn.default {
  fill: var(--color-primary);
  color: var(--color-primary);
  font-weight: var(--weight-semi-bold);
}
</style>
