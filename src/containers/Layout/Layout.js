import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
	state={
		showSideDrawer: false
	}
	sideDrawerHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer};
		});
	}

	sideDrawerOpenHandler = () => {
		
	}

	render() {
		console.log();
		return (
			<Aux>
				<Toolbar sideDrawerHandle={this.sideDrawerHandler}/>
				<SideDrawer 
					isOpen={this.state.showSideDrawer} 
					close={this.sideDrawerHandler}
				/>
				<main className={styles.content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

export default Layout;
