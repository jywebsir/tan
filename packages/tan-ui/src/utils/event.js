export function getDataSet(event) {
	const {
		currentTarget: {
			dataset
		}
	} = event

	return dataset
}