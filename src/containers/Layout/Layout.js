import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	sideDrawerHandler = () => {
		this.setState( prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		} );
	}

	sideDrawerOpenHandler = () => {

	}

	render () {
		console.log(this.props.isAuth);
		return (
			<Aux>
				<Toolbar
					sideDrawerHandle={this.sideDrawerHandler}
					isAuth={this.props.isAuth} 
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
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
const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};


export default connect( mapStateToProps )( Layout );
