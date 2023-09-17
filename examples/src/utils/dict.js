// TODO: 适用 对象和 Map, 注意：需要按顺序就用 Map 对象
export const getOptions = (
	// optionsType = 'el-option',
	map = new Map(),
	// toNumber = false
) => {
	const subItems = []
	for (const [value, label] of map.entries()) {
		// console.log('value, label:', value, label)

		const item = {
			label,
			value,
			// [value + '']: value,
		}
		// if (['el-radio', 'el-radio-button', 'el-checkbox'].includes(optionsType)) {
		// 	item.label = key
		// }
		// if (['el-option'].includes(optionsType)) {
		// 	item.value = key
		// 	item.label = map[key]
		// }
		subItems.push(item)
	}
	console.log('subItems:', subItems)

	return subItems
}

// 性别
export const sexMap = new Map([
	['0', '女'],
	['1', '男'],
])
// 工单状态
export const statusMap = new Map([
	['-1', '全部'],
	['0', '处理中'],
	['1', '已完结'],
	['2', '被退回'],
])

// 工单类型
export const orderType = new Map([
	// [-1, '全部'],
	['0', '普通'],
	['1', '售后'],
	['2', '维修'],
])
// 紧急程度
export const levelMap = new Map([
	// ['-1', '全部'],
	['0', '普通'],
	['1', '重要'],
	['2', '紧急'],
	['3', '特急'],
])
// 任务分类
export const taskType = new Map([
	['-1', '全部任务'],
	['0', '我发起的'],
	['1', '我负责的'],
	['2', '我参与的'],
	['3', '下属负责的'],
])
