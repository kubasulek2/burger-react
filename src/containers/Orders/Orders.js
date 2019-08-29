import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
	state = {
		orders: [],
		loading: true,
		error: false
	}
	componentDidMount() {
		axios.get('/orders.json')
			.then(res => {
				const ordersArr = Object.values(res.data);

			/* 	this.setState({
					loading: false,
					orders: ordersArr
				}); */
			})
			.catch(err => {
				this.setState({ loading: false });
				return err;
			});
	}

	render() {

		let orders = JSON.parse(JSON.stringify(this.state.orders))
			.map((order, i) => (
				<Order key={i} details={order} />
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

		console.log(orders);
		return (
			<div>
				{this.state.loading ? <Spinner /> : orders}
				
			</div>
		);
	}
}

export default Orders;
