<template>
  <b-input-group class="align-items-end">
    <div class="flex-fill">
      <label class="mb-2" :for="inputId">{{ label }}</label>
      <b-form-input
        trim
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        v-model="filterInput"
      />
    </div>
    <template #append>
      <b-btn squared variant="outline-danger" @click="clearFilter">
        <b-icon-trash />
      </b-btn>
    </template>
  </b-input-group>
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
