import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StudentOrders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
    const [message, setMessage] = useState('');

    // Fetch student orders when the component loads
    useEffect(() => {
        const user = localStorage.getItem('user');
        const studentId = user ? JSON.parse(user).user_id : null;

        if (!studentId) {
            setMessage('User ID not found. Please log in again.');
            return;
        }

        axios
            .get(`http://localhost/backend/get_student_orders.php?student_id=${studentId}`, { withCredentials: true })
            .then((response) => setOrders(response.data.orders))
            .catch(() => setMessage('Failed to load orders.'));
    }, []);

    // Cancel order function
    const cancelOrder = async (orderId: number) => {
        try {
            await axios.post(
                'http://localhost/backend/cancel_order.php',
                { order_id: orderId },
                { withCredentials: true }
            );
            setOrders(orders.filter((order) => order.order_id !== orderId));
        } catch (err) {
            setMessage('Failed to cancel order. Please try again.');
        }
    };

    // Submit feedback function
    const submitFeedback = async (orderId: number) => {
        if (!feedback[orderId]) {
            alert('Please enter feedback before submitting.');
            return;
        }

        try {
            await axios.post(
                'http://localhost/backend/submit_feedback.php',
                { order_id: orderId, comment: feedback[orderId] },
                { withCredentials: true }
            );
            setMessage('Feedback submitted successfully!');
            setFeedback((prev) => ({ ...prev, [orderId]: '' })); // Clear feedback input after submission
        } catch (err) {
            alert('Failed to submit feedback. Please try again.');
        }
    };

    // Pay for order function
    const payForOrder = async (orderId: number) => {
        try {
            const response = await axios.post(
                'http://localhost/backend/pay_order.php',
                { order_id: orderId },
                { withCredentials: true }
            );

            if (response.data.status === 'success') {
                setMessage('Payment successful!');
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_id === orderId ? { ...order, order_status: 'paid' } : order
                    )
                );
            } else {
                setMessage(response.data.message || 'Failed to process payment.');
            }
        } catch (error) {
            setMessage('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>My Orders</h2>
            {message && <p className="message">{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.menu_item}</td>
                            <td>{order.quantity}</td>
                            <td>{order.order_status}</td>
                            <td>
                                {order.order_status === 'pending' && (
                                    <button onClick={() => cancelOrder(order.order_id)}>Cancel</button>
                                )}
                                {order.order_status === 'served' && (
                                    <div>
                                        <textarea
                                            placeholder="Leave feedback..."
                                            value={feedback[order.order_id] || ''}
                                            onChange={(e) =>
                                                setFeedback({
                                                    ...feedback,
                                                    [order.order_id]: e.target.value,
                                                })
                                            }
                                        />
                                        <button onClick={() => submitFeedback(order.order_id)}>
                                            Submit Feedback
                                        </button>
                                    </div>
                                )}
                                {order.order_status === 'accepted' && (
                                    <button onClick={() => payForOrder(order.order_id)}>Pay Now</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentOrders;