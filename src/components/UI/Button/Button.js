import React from 'react';
import styles from './Button.module.css';

const button = (props) => {
	return (
		<button
			className={[styles.Button, styles[props.type]].join(' ')} 
			onClick={props.clicked}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default button;
