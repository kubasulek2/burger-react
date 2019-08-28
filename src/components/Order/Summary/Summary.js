import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './Summary.module.css';

const summary = (props) => {
	return (
		<div className={styles.Summary}>
			<h1>We hope it tastes well!</h1>
			<div style={{width: '100%', height: '300px', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				type='Danger'
				clicked={props.cancel}
			>
				Cancel
			</Button>
			<Button
				type='Success'
				clicked={props.continue}
			>
				Confirm
			</Button>
		</div>
	);
};

export default summary;
