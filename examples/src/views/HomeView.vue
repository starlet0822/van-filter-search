<script setup>
import { ref } from 'vue'
import { getOptions, levelMap } from '../utils'

const showFilter = ref(false)
const filterQuery = ref({
  // 默认参数
  keyword: '',
  pageNo: 1,
  pageSize: 10
})

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

const handleConfirm = (query) => {
  filterQuery.value = { ...filterQuery.value, ...query }
  console.log('查询参数:', filterQuery.value)
  showFilter.value = false // 隐藏抽屉筛选

  // menuRef.value?.close?.() // 统一关闭下拉菜单

  // onRefresh()
}
</script>

<template>
  <div class="demo">
    <!-- 排序和筛选 -->
    <van-dropdown-menu
      v-if="false"
      ref="menuRef"
      :close-on-click-outside="false"
      :close-on-click-overlay="false"
    >
      <van-dropdown-item title="排序">
        <div>5555</div>
        <!-- <van-filter-search
          ref="filterSearchRef"
          :field-items="sortItems"
          @confirm="handleConfirm($event, 'sort')"
        ></van-filter-search> -->
      </van-dropdown-item>
      <van-dropdown-item ref="filterRef" title="筛选">
        <filter-search
          ref="filterSearchRef"
          :field-items="fieldItems"
          @confirm="handleConfirm($event, 'filter')"
        ></filter-search>
      </van-dropdown-item>
    </van-dropdown-menu>

    <main>
      <van-button type="primary" @click="showFilter = true">筛选</van-button>
      <div>
        查询参数：
        <pre>{{ JSON.parse(JSON.stringify(filterQuery), null, 2) }}</pre>
      </div>
      <!-- 只有筛选 -->
      <van-popup
        v-model:show="showFilter"
        position="right"
        :closeable="false"
        close-on-popstate
        :style="{ width: '100%', height: '100%' }"
      >
        <filter-search
          ref="filterSearchRef"
          show-header
          :field-items="fieldItems"
          title="全部筛选"
          confirm-button-text="完 成"
          cancel-button-text="重 置"
          @confirm="handleConfirm"
          @close="showFilter = false"
        ></filter-search>
      </van-popup>
    </main>
  </div>
</template>

<style scoped>
.demo {
}
.filter-menu {
  padding-right: 16px;
  background: #ffffff;
}
main {
  padding: 10px 16px;
}
</style>
