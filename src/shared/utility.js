export const updateObject = (oldObj, newProperty) => {
	return {
		...oldObj,
		...newProperty
	};
};

export const checkValidity = ( value, rules ) => {
	let isValid = true;
	
	if ( rules.required ) {

		isValid = value.trim() !== '' && isValid;
	}

	if ( rules.minLength ) {

		isValid = value.length >= rules.minLength && isValid;
	}

	if ( rules.isEmail ) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test( value ) && isValid;
	}


	return isValid;
};