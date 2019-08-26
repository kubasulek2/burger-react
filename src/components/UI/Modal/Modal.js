import React, { Component } from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';


class modal extends Component {

	shouldComponentUpdate(nextProps) {
		return this.props.show !== nextProps.show;
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className={styles.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

modal.propTypes = {
	show: PropTypes.bool.isRequired,
	modalClosed: PropTypes.func.isRequired
};

export default modal;