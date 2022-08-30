export const enumToStorybookSelectControl = (data: object) => ({
	options: Object.keys(data),
	mapping: data,
	control: {
		type: 'select',
		labels: Object.values(data)
	}
})