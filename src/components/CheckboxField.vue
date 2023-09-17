<template>
  <div class="custom-checkbox">
    <ul class="checkbox-group">
      <li
        v-for="(item, index) in checkboxs"
        :key="item[fieldNames.value]"
        class="checkbox-item"
        :style="itemStyle(item, index)"
      >
        <div
          :class="[
            'checkbox-item__content',
            'pointer',
            { 'is-selected': isChecked(item) },
            { 'is-disabled': item.disabled },
          ]"
          @click.stop="onClick(item)"
        >
          <div class="checkbox-item__text ellipsis--l1">{{ item[fieldNames.text] }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxField',
  props: {
    modelValue: {
      type: [Array],
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    // shape: {
    //   type: String,
    //   default: 'square', //'round' | 'square'
    // },
    // 选择项
    options: {
      type: Array,
      default: () => [],
    },
    disabled: Boolean,
    checked: Boolean,
    checkAll: Boolean, // 是否显示全选/反选选项
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

    const checkboxs = computed(() => {
      const { checkAll, options } = props
      let arr = options
      if (checkAll) {
        arr = [{ label: '全部', value: '-1' }, ...arr]
      }
      return arr
    })

    // 数据双向绑定
    const updateValue = (value) => emit('update:modelValue', value)

    // const disabled = computed(() => {
    // 	// if (props.parent && props.bindGroup) {
    // 	// 	const disabled = getParentProp('disabled') || props.disabled

    // 	// 	if (props.role === 'checkbox') {
    // 	// 		const checkedCount = getParentProp('modelValue').length
    // 	// 		const max = getParentProp('max')
    // 	// 		const overlimit = max && checkedCount >= +max

    // 	// 		return disabled || (overlimit && !props.checked)
    // 	// 	}

    // 	// 	return disabled
    // 	// }

    // 	return props.disabled
    // })

    // 切换选中状态
    const onClick = (item) => {
      if (item.disabled) return
      toggle(item)
    }

    const isChecked = (item) => {
      return props.modelValue.indexOf(item[fieldNames.value]) !== -1
    }

    const toggle = (item) => {
      item.checked = !isChecked(item)
      setCheckedValues(item)
    }

    // 设置所有选中值
    const setCheckedValues = ({ [fieldNames.value]: name, checked, disabled }) => {
      const { modelValue } = props
      const values = [...modelValue.slice()] // 先清空
      if (checked) {
        // 已选中
        values.push(name)
      } else {
        // 未选中
        const idx = values.indexOf(name)
        if (idx !== -1) {
          values.splice(idx, 1)
        }
      }
      updateValue(values)
    }

    // 全选/反选
    const toggleAll = (options = {}) => {
      if (typeof options === 'boolean') {
        options = { checked: options }
      }
      const { checked, skipDisabled } = options

      const checkedArr = options.filter((item) => {
        // if (!item.props.bindGroup) {
        // 	return false
        // }
        if (item.disabled && skipDisabled) {
          return item.checked
        }
        return checked ?? !item.checked
      })

      const names = checkedArr.map((item) => item.name)
      updateValue(names)
    }

    watch(
      () => props.modelValue,
      (value) => updateValue(value)
    )

    return {
      checkboxs,
      itemStyle,
      gutterSize,
      isChecked,
      // disabled,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './styles/var';

.custom-checkbox {
  .checkbox-group {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .checkbox-item {
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
        text-align: center;
        color: var(--van-gray-6);
        background: var(--van-bac);
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
