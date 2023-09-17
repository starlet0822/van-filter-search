<template>
  <div class="custom-radio">
    <ul class="radio-group">
      <li
        v-for="(item, index) in options"
        :key="item[fieldNames.value] + index"
        :class="['radio-item']"
        :style="itemStyle(item, index)"
      >
        <div
          :class="[
            'radio-item__content',
            'pointer',
            { 'is-selected': isChecked(item) },
            { 'is-disabled': item.disabled },
          ]"
          @click.stop="onClick(item)"
        >
          <div class="radio-item__text ellipsis--l1">
            {{ item[fieldNames.text] }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, toRef } from 'vue'

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
    checkedColor: {
      type: [String],
      default: '#2e6cf3',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { columnNum, gutter, fieldNames } = props
    const itemStyle = (item, index) => {
      const styles = {
        flexBasis: `${(1 / +columnNum) * 100}%`,
        marginBottom: index >= +columnNum ? '0px' : '',
        // paddingRight: index !== 0 && index % +columnNum === 0 ? '0px' : '' // FIX
      }

      return styles
    }

    const gutterSize = computed(() => gutter + 'px')

    // 数据双向绑定
    const updateValue = (value) => emit('update:modelValue', value)

    const setCheckedValue = ({ [fieldNames.value]: name, checked }) => {
      const value = checked ? name : ''
      updateValue(value)
    }

    // 切换选中状态
    const onClick = (item) => {
      if (item.disabled) return
      toggle(item)
    }

    const isChecked = (item) => {
      return props.modelValue === item[fieldNames.value]
    }

    const toggle = (item) => {
      item.checked = !isChecked(item)
      setCheckedValue(item)
    }

    return {
      itemStyle,
      gutterSize,
      isChecked,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './styles/var';

.custom-radio {
  .radio-group {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .radio-item {
      padding-right: v-bind(gutterSize);
      margin-bottom: v-bind(gutterSize);

      // &:nth-child(3n+3) {
      // 	padding-right: 0;
      // }

      &__content {
        width: 100%;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: var(--van-padding-base) 6px;
        border-radius: var(--van-radius-md);
        overflow: hidden;
        text-align: center;
        color: var(--van-gray-6);
        background: #fff;
        border: var(--van-border-width) solid var(--van-border-color);
        font-size: 13px;
        transition: all 0.3s;
        // cursor: pointer;
        &.is-selected {
          color: $themeColor;
          border-color: currentColor;
          background: scale-color($themeColor, $lightness: 90%);

          // @at-root {
          //   & {
          //     &::after {
          //       position: absolute;
          //       content: ' ';
          //       display: block;
          //       width: 100%;
          //       height: 100%;
          //       // TODO：perf 使用 rgab(var(--van-blue), .15) 无效
          //       background: var(--van-blue);
          //       opacity: .15;
          //       z-index: 1;
          //     }
          //   }
          // }
        }
      }

      &__text {
      }
    }
  }
}
</style>
