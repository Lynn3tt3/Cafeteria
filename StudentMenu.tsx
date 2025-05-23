import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StudentMenu: React.FC = () => {
    const [menu, setMenu] = useState<any[]>([]); // Initialize as an empty array
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost/backend/get_menu_items.php') // Backend placeholder URL
            .then((response) => {
                if (response.data && response.data.status === 'success' && response.data.menu) {
                    setMenu(response.data.menu); // Set menu data
                } else if (response.data && response.data.status === 'success' && response.data.menu.length === 0) {
                    setError('No menu items available.');
                } else {
                    setError(response.data.message || 'Failed to load menu.');
                }
            })
            .catch(() => setError('Failed to load menu.'));
    }, []);

    const placeOrder = async (menuItemId: number) => {
        const user = localStorage.getItem('user');
        const studentId = user ? JSON.parse(user).user_id : null;

        if (!studentId) {
            alert('Please log in to place an order.');
            return;
        }

        try {
            const response = await axios.post('http://localhost/backend/place_order.php', {
                student_id: studentId,
                order_details: [{ menu_item_id: menuItemId, quantity: 1 }], // Default quantity is 1
            });

            if (response.data.status === 'success') {
                setMessage('Order placed successfully!');
            } else {
                setMessage(response.data.message || 'Failed to place order.');
            }
        } catch (error) {
            setMessage('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="menu-container">
            <h2>Today's Menu</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {menu.length > 0 ? (
                    menu.map((item: any) => (
                        <div
                            key={item.id} // Use `id` as the key (ensure your backend returns `id`)
                            style={{
                                border: '1px solid #ddd',
                                padding: '5px',
                                borderRadius: '5px',
                            }}
                        >
                            <h3>
                                {item.name} - Ksh {item.price}
                            </h3>
                            <p>{item.description}</p>
                            <p>
                                <strong>Category:</strong> {item.category}
                            </p>
                            <button onClick={() => placeOrder(item.id)}>Order Now</button>
                        </div>
                    ))
                ) : (
                    !error && <p>No menu items available.</p> // Show a message if no menu items exist
                )}
            </div>
        </div>
    );
};

export default StudentMenu;


