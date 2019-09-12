import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


const Layout = props => {

	const [ sideDrawer, setSideDrawer ] = useState(false);
	
	const sideDrawerHandler = () => {
		setSideDrawer(prevState => !prevState);
	};

	return (
		<Aux>
			<Toolbar
				sideDrawerHandle={ sideDrawerHandler }
				isAuth={ props.isAuth }
			/>
			<SideDrawer
				isAuth={ props.isAuth }
				isOpen={ sideDrawer }
				close={ sideDrawerHandler }
			/>
			<main className={ styles.content }>
				{ props.children }
			</main>
			;	</Aux>
	);
}
const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};


export default connect(mapStateToProps)(Layout);
