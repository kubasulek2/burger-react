export const updateObject = (oldObj, newProperty) => {
	return {
		...oldObj,
		...newProperty
	};
}