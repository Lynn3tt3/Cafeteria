import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css';

// Define order type
interface Order {
    order_id: number;
    student_name: string;
    menu_item: string;
    quantity: number;
    order_status: string;
}

const StaffOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<string>('All');

    useEffect(() => {
        axios
            .get('http://localhost/backend/get_all_orders.php', { withCredentials: true })
            .then((response) => setOrders(response.data.orders))
            .catch(() => console.error('Error fetching orders'));
    }, []);

    // Update order status
    const updateOrderStatus = async (orderId: number, status: string) => {
        try {
            await axios.post(
                'http://localhost/backend/update_order_status.php',
                { order_id: orderId, status },
                { withCredentials: true }
            );
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === orderId ? { ...order, order_status: status } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Filter orders based on status
    const filteredOrders =
        filter === 'All' ? orders : orders.filter((order) => order.order_status === filter.toLowerCase());

    return (
        <div className="container">
            <h2>Manage Orders</h2>

            {/* Filter Orders */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Paid">Paid</option>
                    <option value="Served">Served</option>
                </select>
            </div>

            {/* Orders Table */}
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.student_name}</td>
                            <td>{order.menu_item}</td>
                            <td>{order.quantity}</td>
                            <td>{order.order_status}</td>
                            <td>
                                {order.order_status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => updateOrderStatus(order.order_id, 'accepted')}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(order.order_id, 'rejected')}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {order.order_status === 'accepted' && (
                                    <button
                                        onClick={() => updateOrderStatus(order.order_id, 'paid')}
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                                {order.order_status === 'paid' && (
                                    <button
                                        onClick={() => updateOrderStatus(order.order_id, 'served')}
                                    >
                                        Mark as Served
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffOrders;