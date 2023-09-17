<template>
	<div class="custom-date-picker">
		<van-field
			v-model="inputValue"
			readonly
			clearable
			placeholder="点击选择"
			v-bind="$attrs.field || $attrs || {}"
			:border="false"
			@click="onPickDate"
		></van-field>

		<van-popup
			v-model:show="showPicker"
			position="bottom"
			:teleport="teleport"
			close-on-popstate
			:close-on-click-overlay="false"
			v-bind="$attrs.popupProps || {}"
		>
			<van-date-picker
				v-model="currentDate"
				title="选择时间"
				v-bind="$attrs.dateProps || {}"
				@confirm="onConfirm"
				@cancel="showPicker = false"
			/>
		</van-popup>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

const y = new Date().getFullYear()
const m = new Date().getMonth() + 1
const d = new Date().getDay()

export default defineComponent({
	props: {
		modelValue: {
			type: [Array, String],
			default: '',
		},
		separator: {
			type: String,
			default: '-',
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const inputValue = computed({
			get: () => props.modelValue,
			set: val => {
				emit('update:modelValue', val)
			},
		})
		const currentDate = ref([y, m, d])

		const showPicker = ref(false)
		const teleport = document.querySelector('.form-wrapper')
		const onConfirm = ({ selectedValues }) => {
			const result = selectedValues.join(props.separator)
			emit('update:modelValue', result)
			showPicker.value = false
		}
		// 回显之前选中时间
		const onPickDate = () => {
			currentDate.value = inputValue.value ? inputValue.value.split(props.separator) : [y, m, d]
			showPicker.value = true
		}

		return {
			inputValue,
			currentDate,
			showPicker,
			teleport,
			onConfirm,
			onPickDate,
		}
	},
})
</script>

<style lang="scss" scoped>
.custom-date-picker {
	.van-field {
		border: var(--van-border-width) solid var(--van-border-color);
    padding: var(--van-padding-base) 6px;
    border-radius: var(--van-radius-md);
    overflow: hidden;
	}
}
</style>
