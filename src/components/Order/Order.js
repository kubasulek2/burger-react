import React from 'react';

import styles from './Order.module.css';

const order = () => {
	return (
		<div className={styles.Order}>
			<p>Ingredients: Salad (1)</p>
			<p>Price: <strong>4 $</strong></p>
		</div>
	);
};

export default order;
