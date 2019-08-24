import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
	state={
		showSideDrawer: false
	}
	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer:false});
	}

	sideDrawerOpenHandler = () => {
		
	}

	render() {
		return (
			<Aux>
				<Toolbar />
				<SideDrawer 
					isOpen={this.state.showSideDrawer} 
					close={this.sideDrawerCloseHandler}
				/>
				<main className={styles.content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
};

export default Layout;
