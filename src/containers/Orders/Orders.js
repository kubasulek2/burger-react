import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
	state = {
		orders: [],
		loading: true,
		error: false
	}
	componentDidMount() {
		axios.get('/orders')
			.then(res => {
				let ordersArr = [];
				/* eslint-disable no-unused-vars */
				for (const key in res.data) {
					if (Object.hasOwnProperty.call(res.data, key)) {
						ordersArr.push({
							...JSON.parse(JSON.stringify(res.data[key])),
							id: key
						});

					}
				}
				/* eslint-enable no-unused-vars */

				console.log(res.data, ordersArr);
				ordersArr[0].customer.address.street = 1;
				console.log(res.data, ordersArr);


				this.setState({
					loading: false,
					orders: ordersArr
				});
			})
			.catch(err => {
				this.setState({ loading: false });
				return err;
			});
	}

	render() {

		let orders = JSON.parse(JSON.stringify(this.state.orders))
			.map(order => (
				<Order key={order.id} details={order} />
			));

		if (!orders.length) orders = (
			<h1
				style={{
					textAlign: 'center',
					fontSize: '2.5rem',
					margin: '2rem'
				}}
			>
				There are no orders available.
			</h1>
		);

		return (
			<div>
				{this.state.loading ? <Spinner /> : orders}

			</div>
		);
	}
}

export default withError(Orders, axios);
