<template>
  <div class="custom-cell">
    <ul class="cell-group">
      <li
        v-for="(item, index) in options"
        :key="item[fieldNames.value]"
        class="cell-item"
        :style="itemStyle(item, index)"
      >
        <div
          :class="[
            'cell-item__content',
            'pointer',
            { 'is-selected': modelValue == item[fieldNames.value] },
            { 'is-disabled': item.disabled },
          ]"
          :style="{ 'justify-content': justify }"
          @click.stop="onChange(item)"
        >
          <div class="cell-item__text">{{ item[fieldNames.text] }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: [String],
    },
    name: {
      type: String,
      default: '',
    },
    // 选择项
    options: {
      type: Array,
      default: () => [],
    },
    disabled: Boolean,
    fieldNames: {
      type: Object,
      default: () => ({ text: 'text', value: 'value' }),
    },
    // 列数
    columnNum: {
      type: [Number, String],
      default: 3,
    },
    // 格子间距
    gutter: {
      type: [Number, String],
      default: 10,
    },
    // 选项文本对齐方式
    justify: {
      type: String,
      default: 'center',
      validator: function (val) {
        return ['center', 'start'].includes(val)
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { columnNum, gutter, fieldNames } = props
    const itemStyle = (item, index) => {
      const styles = {
        flexBasis: `${(1 / +columnNum) * 100}%`,
        marginBottom: index >= +columnNum ? '0px' : '',
      }

      return styles
    }

    const gutterSize = computed(() => gutter + 'px')

    const onChange = (item) => {
      if(item.disabled) return
      emit('update:modelValue', item[fieldNames.value])
    }
    return {
      itemStyle,
      gutterSize,
      onChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './styles/var';

.custom-cell {
  .cell-group {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .cell-item {
      padding-right: v-bind(gutterSize);
      margin-bottom: v-bind(gutterSize);

      &__content {
        width: 100%;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: var(--van-padding-base) 6px;
        border-radius: var(--van-radius-md);
        overflow: hidden;
        text-align: left;
        color: var(--van-gray-6);
        background: #fff;
        border: var(--van-border-width) solid var(--van-border-color);
        font-size: 13px;
        transition: all 0.3s;
        &.is-selected {
          color: $themeColor;
          border-color: currentColor;
          background: scale-color($themeColor, $lightness: 90%);
        }
      }

      &__text {
      }
    }
  }
}
</style>
