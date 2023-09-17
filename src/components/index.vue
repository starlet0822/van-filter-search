<template>
  <div class="form form-wrapper">
    <div v-if="showHeader" class="form__header">
      <van-icon
        v-if="showClose"
        name="cross"
        class="form__header-close"
        @click="onClose"
      ></van-icon>
      <div class="form__header-title">{{ title }}</div>
    </div>

    <div class="form__body">
      <div
        v-for="(item, index) in fieldItems"
        :key="item.name + index"
        class="filter__item"
      >
        <div class="filter__item-title">
          {{ item.title }}
          <span v-if="['CheckboxField'].includes(item.type)" class="tips"
            >(可多选)</span
          >
        </div>
        <component
          :is="item.type"
          v-model="selectedValues[item.name]"
          :title="item.title"
          v-bind="item.attrs"
        ></component>
      </div>
    </div>

    <div class="form__footer van-safe-area-bottom">
      <div class="filter__cancel" @click.stop="onReset">
        {{ cancelButtonText }}
      </div>
      <div class="filter__confirm" @click.stop="onConfirm">
        {{ confirmButtonText }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
// FIXME: https://github.com/antfu/unplugin-vue-components/issues/11
// import { Field } from 'vant'
// import 'vant/es/field/index.css'

import {
  InputField,
  RadioField,
  CheckboxField,
  DateField,
  CellField,
  CascaderField,
} from '.'
import { isUndefined } from '../utils'
import { ref } from 'vue'
// TODO：统计选择条件数量

export default defineComponent({
  name: 'VanFilterSearch',
  components: {
    InputField,
    RadioField,
    CheckboxField,
    DateField,
    CellField,
    CascaderField,
  },
  props: {
    title: {
      type: String,
      default: '数据筛选',
    },
    fieldItems: {
      type: Array,
      required: true,
      default: () => [
        // {
        // 	type: 'InputField',
        // 	title: '关键词查询',
        // 	value: '',
        // 	name: 'vanField', // 等同于字段名
        // 	// 表单属性
        // 	attrs: {
        // 		placeholder: '输入搜索关键词',
        // 		// rules: [{ required: true, message: '请填写' }],
        // 	},
        // },
        // // {
        // // 	type: 'InputField',
        // // 	title: '关键词查询',
        // // 	value: '',
        // // 	name: 'keyword', // 等同于字段名
        // // 	// 表单属性
        // // 	attrs: {
        // // 		placeholder: '输入搜索关键词',
        // // 		// rules: [{ required: true, message: '请填写' }],
        // // 	},
        // // },
        // {
        // 	type: 'radioField',
        // 	title: '任务状态',
        // 	value: '0',
        // 	name: 'status', // 等同于字段名
        // 	// 表单属性
        // 	attrs: {
        // 		options: [
        // 			{ label: '未审核', value: '-1' },
        // 			{ label: '已审核', value: '0' },
        // 			{ label: '未通过', value: '1' },
        // 			{ label: '审核中', value: '2' },
        // 			{ label: '已退回', value: '3' },
        // 		],
        // 	},
        // },
        // {
        // 	type: 'CheckboxField',
        // 	title: '紧急程度（多选）',
        // 	value: ['-1'],
        // 	name: 'level', // 等同于字段名
        // 	// 表单属性
        // 	attrs: {
        // 		options: getOptions(levelMap),
        // 	},
        // },
        // {
        // 	type: 'DateField',
        // 	title: '创建时间',
        // 	value: '',
        // 	name: 'createTime', // 等同于字段名
        // 	// 表单属性
        // 	attrs: {
        // 		placeholder: '选择时间',
        // 		// rules: [{ required: true, message: '请填写' }],
        // 	},
        // },
        // // {
        // // 	type: 'CascaderField',
        // // 	title: '所在地区',
        // // 	value: '',
        // // 	name: 'location', // 等同于字段名
        // // 	// 表单属性
        // // 	attrs: {
        // // 		placeholder: '选择地区',
        // // 		fieldNames: {
        // // 			text: 'label',
        // // 			value: 'value',
        // // 		},
        // // 		options: [
        // // 			{
        // // 				label: '浙江省',
        // // 				value: '330000',
        // // 				children: [{ label: '杭州市', value: '330100' }],
        // // 			},
        // // 			{
        // // 				label: '江苏省',
        // // 				value: '320000',
        // // 				children: [{ label: '南京市', value: '320100' }],
        // // 			},
        // // 		],
        // // 	},
        // // },
      ],
    },
    confirmButtonText: {
      type: String,
      default: '确 认',
    },
    cancelButtonText: {
      type: String,
      default: '取 消',
    },
    showHeader: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
    checkedColor: {
      type: [String],
      default: '#2e6cf3'
    }
    // formOptions: {
    //   type: Object,
    //   default: () => ({
    //     'label-align': 'top',
    //     'label-width': '6.2em',
    //     'input-align': 'left',
    //   }),
    // },
  },
  // provide: {
  //   activeColor: activeColor
  // },
  emits: ['close', 'confirm', 'cancel'],
  setup(props, { emit, expose }) {
    const initFormModel = (isEmit) => {
      const selectedValues = {}
      const initFormItemValue = (item) => {
        let value = ''
        if (!isUndefined(item.value)) {
          value = item.value
        } else if ([].includes(item.type)) {
          value = []
        } else {
          value = ''
        }
        return value
      }
      props.fieldItems.forEach((item) => {
        // 处理默认值
        if (item.name) {
          selectedValues[item.name] = initFormItemValue(item)
          // form.value[item.prop] =
          //   props.modelValue[item.prop] || initFormItemValue(item);
        }
        // 处理 规则
        // rules.value[item.prop] =
        //   item.rule || (formProps.rules && formProps.rules[item.prop]) || [];
      })
      // isEmit && emit("update:modelValue", selectedValues);
      return { ...selectedValues }
    }
    const formProps = {
      'label-align': 'top',
      'label-width': '6.2em',
      'input-align': 'left',
      // ...props.formOptions,
    }

    const selectedValues = ref(initFormModel())

    const getEventParams = () => ({
      selectedValues: selectedValues.value,
      // selectedOptions: selectedOptions.value,
      // selectedIndexes: selectedIndexes.value,
    })

    const getSelectedValues = () => selectedValues.value

    const onClose = () => {
      onReset(false)
      emit('close', getSelectedValues())
    }

    const onReset = async (refresh = true) => {
      selectedValues.value = initFormModel()
      emit('cancel', getSelectedValues())
      refresh && onConfirm()
    }
    const onConfirm = () => {
      // const result = getSelectedValues()
      console.log('onConfirm', selectedValues.value)
      emit('confirm', getSelectedValues())
    }

    expose({
      // onClose,
      cancel: onReset,
      confirm: onConfirm,
      getSelectedValues,
    })

    return {
      formProps,
      selectedValues,
      onClose,
      onReset,
      onConfirm,
    }
  },
})
</script>

<style lang="scss">
@import './styles/index';
</style>
