# van-filter-search

van-filter-search for vant-ui.

> this component is for vant4.x and vue3.x.

## 文档

[https://starlet0822.github.io/van-filter-search](https://yujinpan.github.io/el-table-infinite-scroll)

## 快速开始

### 1. ES module

#### 安装

```shell
npm install --save van-filter-search
// or
yarn add van-filter-search
// or
pnpm add van-filter-search
```

#### 注册

##### 全局注册

```js
import VanFilterSearch from "van-filter-search";

const app = createApp(App);
app.use(VanFilterSearch);
```

##### 组件引入

```vue
<template>
  <van-filter-search></van-filter-search>
</template>

<script>
import { VanFilterSearch } from "van-filter-search";

export default defineComponent({
  components: {
    VanFilterSearch
})
</script>
```

#### 使用

```vue
<script setup>
import { VanFilterSearch } from "van-filter-search";

const filterSearchRef = ref(null)
const fieldItems = ref([
  {
    type: 'InputField',
    title: '关键词查询',
    value: '',
    name: 'keyword',
    attrs: {
      placeholder: '输入搜索关键词'
    },
  },
  {
    type: 'RadioField',
    title: '任务状态',
    value: '0',
    name: 'status',
    attrs: {
      options: [
        { text: '未审核', value: '-1' },
        { text: '已审核', value: '0' },
        { text: '未通过', value: '1' },
        { text: '审核中', value: '2' },
        { text: '已退回', value: '3' }
      ],
    },
  },
  {
    type: 'CheckboxField',
    title: '紧急程度',
    value: [],
    name: 'level',
    attrs: {
      fieldNames: { text: 'label', value: 'id' },
      options: [
        { label: '重要', id: '0' },
        { label: '重要', id: '1' },
        { label: '紧急', id: '2', disabled: true },
        { label: '特急', id: '3' }
      ],
    },
  },
  {
    type: 'DateField',
    title: '创建时间',
    value: '',
    name: 'createTime',
    attrs: {
      placeholder: '选择时间'
    },
  },
])

const handleConfirm = (queryParams) => {
  // do something...
  // fetch data
}

onMounted(() => {
  console.log(filterSearchRef.value.getSelectedValues())
})
</script>

<template>
  <van-filter-search
    ref="filterSearchRef"
    :field-items="fieldItems"
    :show-header="true"
    @confirm="handleConfirm"
  ></van-filter-search>
</template>

<style lang="scss" scoped></style>
```

### 2. CDN

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@3.3.4/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/van-filter-search"></script>
</head>

<body>
  <div id="app">
    <van-filter-search title="筛选条件" :field-items="fieldItems" show-header />
  </div>

</body>
<script>
  const App = {
    components: {
      VanFilterSearch: window['van-filter-search'].VanFilterSearch
    },
    data() {
      return {
        fieldItems: [
          {
            type: 'InputField',
            title: '关键词查询',
            value: '',
            name: 'keyword',
            attrs: {
              placeholder: '输入搜索关键词',
            },
          },
          {
            type: 'RadioField',
            title: '任务状态',
            value: '0',
            name: 'status',
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
            value: [],
            name: 'level',
            attrs: {
              options: [
                { text: '普通', value: '0' },
                { text: '重要', value: '1' },
                { text: '紧急', value: '2' },
                { text: '特急', value: '3' },
              ],
            },
          },
          {
            type: 'DateField',
            title: '创建时间',
            value: '',
            name: 'createTime',
            attrs: {
              placeholder: '选择时间',
            },
          },
        ]
      }
    },
  };
  Vue.createApp(App).mount('#app');
</script>

</html>
```

## API

### 属性

| 参数                | 说明                             | 类型                 | 默认值   |
| ------------------- | -------------------------------- | -------------------- | -------- |
| field-items          | 对象数组，配置选项类型显示的数据 | `FormItemOption[]` | []       |
| title               | 顶部栏标题                       | `string`           | 数据筛选 |
| show-header         | 是否显示顶部栏                   | `boolean`          | false    |
| show-close          | 是否显示关闭图标                 | `boolean`          | true     |
| confirm-button-text | 按钮确认文字                     | `string`           | 确 认    |
| cancel-button-text  | 取消按钮文字                     | `string`           | 取 消    |
| theme-color         | 选项选中状态颜色 (暂不支持)      | `string`           | \#2e6cf3 |

### 事件

| 事件名  | 说明               | 回调参数       |
| ------- | ------------------ | -------------- |
| confirm | 点击确认按钮时触发 | selectedValues |
| cancel  | 点击取消按钮时触发 | selectedValues |
| close   | 关闭弹窗时触发     | selectedValues |

### 插槽

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |

### 方法

| 方法              | 说明                  | 参数 | 返回值         |
| ----------------- | --------------------- | ---- | -------------- |
| confirm           | 触发 `confirm` 事件 | -    | -              |
| cancel            | 触发 `cancel`事件   | -    |                |
| getSelectedValues | 获取已选中的选项      | -    | selectedValues |

### FormItemOption 数据结构

| 键名  | 说明                                                                                               | 类型       |
| ----- | -------------------------------------------------------------------------------------------------- | ---------- |
| type  | 选项类型，可选值为 `InputField`  `RadioField`  `CheckboxField`  `DateField`  `CellField` | `string` |
| title | 选项标题                                                                                           | `string` |
| value | 选项当前输入或选中的值                                                                             | `any`    |
| name  | 选项字段名称，作为提交时的标识符                                                                   | `string` |
| attrs | 当前对应选项组件属性                                                                               | -          |

### 选项组件属性

#### InputField(输入框)

| prop              | description                | type |
| ----------------- | -------------------------- | ---- |
| VanField 的 props | 支持 `VanField` 所有属性 | -    |

#### RadioField(单选项)

| 参数        | 说明                             | 类型         | 默认值                          |
| ----------- | -------------------------------- | ------------ | ------------------------------- |
| v-model     | 当前选中的值                     | `any`      | -                               |
| name        | 选项字段名称，作为提交时的标识符 | `string`   | -                               |
| options     | 对象数组，可选项数据源           | `Option[]` | []                              |
| field-names | 自定义 `options` 结构中的字段  | `object`   | { text: 'text', value: 'value'} |
| column-num  | 每行显示几个选项                 | `number`   | `string`                      |
| gutter      | 选项之间的间距                   | `number`   | `string`                      |

#### CheckboxField(多选项)

| 参数        | 说明                             | 类型         | 默认值                          |
| ----------- | -------------------------------- | ------------ | ------------------------------- |
| v-model     | 当前选中的值                     | `string[]` | []                              |
| name        | 选项字段名称，作为提交时的标识符 | `string`   | -                               |
| options     | 对象数组，可选项数据源           | `Option[]` | []                              |
| field-names | 自定义 `options` 结构中的字段  | `object`   | { text: 'text', value: 'value'} |
| column-num  | 每行显示几个选项                 | `number`   | `string`                      |
| gutter      | 选项之间的间距                   | `number`   | `string`                      |

#### CellField(排序项)

| 参数        | 说明                                            | 类型         | 默认值                          |
| ----------- | ----------------------------------------------- | ------------ | ------------------------------- |
| v-model     | 当前选中的值                                    | `string`   | -                               |
| name        | 选项字段名称，作为提交时的标识符                | `string`   | -                               |
| options     | 对象数组，可选项数据源                          | `Option[]` | []                              |
| field-names | 自定义 `options` 结构中的字段                 | `object`   | { text: 'text', value: 'value'} |
| column-num  | 每行显示几个选项                                | `number`   | `string`                      |
| gutter      | 选项之间的间距                                  | `number`   | `string`                      |
| justify     | 选项文本对齐方式，可选值为 `center` `start` | `string`   | center                          |

#### DateField(日期选择)

| 参数                                                     | 说明                                             | 类型                                                                                                                                                                                                                      | 默认值 |
| -------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| v-model                                                  | 当前选中的日期                                   | `string`                                                                                                                                                                                                                | -      |
| separator                                                | 日期显示分隔符                                   | `string`                                                                                                                                                                                                                | '-'    |
| VanField``VanDatePicker``VanPopup 的 props | `VanField` `VanDatePicker` `VanPopup` 属性 | 参考文档``[VanField](https://vant-contrib.gitee.io/vant/#/zh-CN/field)``[VanDatePicker](https://vant-contrib.gitee.io/vant/#/zh-CN/date-picker)``[VanPopup](https://vant-contrib.gitee.io/vant/#/zh-CN/popup) | -      |

### Option 数据结构

| 参数      | 说明                   | 类型        |
| --------- | ---------------------- | ----------- |
| text      | 选项文字内容           | `string`  |
| value     | 选项对应的值           | `any`     |
| disabled  | 是否禁用选项           | `boolean` |
| className | 选项额外类名(暂未支持) | `string`  |
