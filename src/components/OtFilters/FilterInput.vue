<template>
  <b-form-group class="align-items-end" :label="label" :label-for="inputId">
    <b-input-group class="mt-2">
      <b-form-input
        trim
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        debounce="250"
        v-model="filterInput"
      />
      <template #append>
        <b-btn squared variant="outline-danger" @click="clearFilter">
          <b-icon-trash />
        </b-btn>
      </template>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  name: "FilterInput",

  props: {
    value: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    inputId: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: ""
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filterInput: this.value
    };
  },

  watch: {
    value(value) {
      this.filterInput = value;
    },

    filterInput(value) {
      this.$emit("input", value);
    }
  },

  methods: {
    clearFilter() {
      if (this.filterInput) {
        this.$emit("clear-filter");
      }
    }
  }
};
</script>
