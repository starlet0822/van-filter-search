<script setup>
import VanFilterSearch from '../src/components/index.vue' // 本地调试

// import { VanFilterSearch } from '../dist/van-filter-search.es' // 打包调试
// import '../dist/style.css' // perf: 怎么实现不用手动引入？

import { getOptions, levelMap } from './utils'

const filterSearchRef = ref(null)

const sortItems = [
  {
    type: 'CellField',
    title: '排序方式',
    value: 'asc',
    name: 'order', // 等同于字段名
    // 表单属性
    attrs: {
      columnNum: 1,
      justify: 'start',
      options: [
        // { text: '默认排序', value: 'default' },
        { text: '升序排序', value: 'asc' },
        { text: '倒序排序', value: 'desc' },
      ],
    },
  },
  {
    type: 'CellField',
    title: '排序字段',
    value: 'startTime',
    name: 'prop', // 等同于字段名
    // 表单属性
    attrs: {
      columnNum: 2,
      options: [
        { text: '开始时间', value: 'startTime' },
        { text: '工单名称', value: 'name' },
        // { text: '编号', value: 'no' },
      ],
    },
  },
]
const fieldItems = ref([
  ...sortItems,
  {
    type: 'InputField',
    title: '关键词查询',
    value: '',
    name: 'keyword', // 等同于字段名
    // 表单属性
    attrs: {
      placeholder: '输入搜索关键词',
      disabled: false,
      // rules: [{ required: true, message: '请填写' }],
    },
  },
  {
    type: 'RadioField',
    title: '任务状态',
    value: '0',
    name: 'status', // 等同于字段名
    // 表单属性
    attrs: {
      options: [
        { text: '未审核', value: '-1' },
        { text: '已审核', value: '0' },
        { text: '未通过', value: '1' },
        { text: '审核中', value: '2' },
        { text: '已退回', value: '3' },
      ],
    },
  },
  {
    type: 'CheckboxField',
    title: '紧急程度',
    value: ['2'],
    name: 'level', // 等同于字段名
    // 表单属性
    attrs: {
      fieldNames: { text: 'label', value: 'value' },
      options: getOptions(levelMap).map((v, i) => {
        if (i == 2) v.disabled = true
        return v
      }),
    },
  },
  {
    type: 'DateField',
    title: '创建时间',
    value: '',
    name: 'createTime', // 等同于字段名
    // 表单属性
    attrs: {
      placeholder: '选择时间',
      // disabled: true,
      dateProps: {
        title: '选择时间',
      },
      popupProps: { 'close-on-click-overlay': true },
    },
  },
])

onMounted(() => {
  console.log(filterSearchRef.value.getSelectedValues())
})
</script>

<template>
  <van-filter-search
    ref="filterSearchRef"
    :field-items="fieldItems"
    :showHeader="true"
  ></van-filter-search>
</template>

<style lang="scss"></style>
