<template>
  <div class="custom-input">
    <van-field
      v-model.trim="inputValue"
      autocomplete="off"
      :border="false"
      clearable
      v-bind="$attrs.field || $attrs || {}"
    ></van-field>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputField',
  inheritAttrs: false,
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val)
      },
    })
    return {
      inputValue,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-input {
  .van-field {
    border: var(--van-border-width) solid var(--van-border-color);
    padding: var(--van-padding-base) 6px;
    border-radius: var(--van-radius-md);
    overflow: hidden;
  }
}
</style>
