import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';


const modal = props => {

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
	// }

	return (
		<Aux>
			<Backdrop
				show={ props.show }
				clicked={ props.modalClosed }
			/>
			<div
				className={ styles.Modal }
				style={ {
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				} }
			>

				{ props.children }

			</div>
		</Aux>
	);
}

modal.propTypes = {
	show: PropTypes.bool.isRequired,
	modalClosed: PropTypes.func.isRequired
};

export default React.memo(modal, (prevProps, nextProps) => {
	return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
});