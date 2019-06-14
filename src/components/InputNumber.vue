<template>
  <div style="height: 100%;">
    <label for="number" class="scheme__label" v-html="label"></label>
    <input
        class="scheme__input"
        id="number"
        type="number"
        v-model="number"
        :step="step"
        :max="max"
        :min="min"
        @input="validateNumber">
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  data() {
    return {
      number: this.value,
    };
  },
  props: {
    label: {
      default: '',
    },
    min: {
      type: Number,
      default: 0,
      required: false,
    },
    max: {
      type: Number,
      default: 1,
      required: false,
    },
    value: {
      type: Number,
      default: 1,
      required: false,
    },
    step: {
      type: Number,
      default: 0.1,
      required: false,
    },
  },
  methods: {
    validateNumber() {
      const num = parseFloat(this.number) || 0;
      if (num !== 0) {
        if (num > this.max) {
          this.number = this.max;
          this.$emit('input', this.max);
        } else {
          this.number = this.num < this.min ? this.min : num;
          this.$emit('input', this.num < this.min ? this.min : num);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
