import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actionIndex';

const Orders = props => {

	const { fetchOrders } = props;
	useEffect(() => fetchOrders(), [ fetchOrders ]);



	let orders = props.orders
		.map(order => (
			<Order key={ order.id } details={ order } />
		));

	if (!orders.length) orders = (
		<h1
			style={ {
				textAlign: 'center',
				fontSize: '2.5rem',
				margin: '2rem'
			} }
		>
			There are no orders available.
		</h1>
	);

	return (
		<div>
			{ props.loading ? <Spinner /> : orders }

		</div>
	);

}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,

	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: () => dispatch(actions.fetchOrders()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));
