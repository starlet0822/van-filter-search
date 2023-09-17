<template>
	<div class="custom-cascader">
		<van-field
			v-model="inputValue"
			:readonly="true"
			v-bind="$attrs"
			@click="showPicker = true"
		></van-field>

		<van-popup v-model:show="showPicker" position="bottom" :teleport="teleport" :overlay="true">
			<van-cascader
				v-model="cascaderValue"
				title="请选择所在地区"
				v-bind="$attrs"
				@close="showPicker = false"
				@finish="onFinish"
			/>
		</van-popup>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: ['modelValue'],
	emits: ['update:modelValue'],
	setup(props, { emit, attrs }) {
		const inputValue = computed({
			get: () => props.modelValue,
			set: val => {
				emit('update:modelValue', val)
			},
		})

		const showPicker = ref(false)
		const cascaderValue = ref('')
		const teleport = document.querySelector('.form-wrapper')

		// 全部选项选择完毕后，会触发 finish 事件
		const onFinish = ({ selectedOptions }) => {
			const { text, value } = attrs.fieldNames || {
				text: 'label',
				value: 'value',
				children: 'children',
			}
			const result = selectedOptions.map(option => option[text]).join('/')
			emit('update:modelValue', result)
			showPicker.value = false
		}

		return {
			inputValue,
			cascaderValue,
			showPicker,
			teleport,
			onFinish,
		}
	},
})
</script>

<style lang="scss" scoped>
.custom-cascader {
	.van-field {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 3px;
		overflow: hidden;
	}
}
</style>
