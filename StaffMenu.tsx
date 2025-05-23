import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StaffMenu: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost/backend/get_menu_items.php');
            setMenuItems(response.data.menu || []);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        const createdBy = user ? JSON.parse(user).user_id : null;

        console.log('Created By:', createdBy); // Debugging

        if (!name || !description || !price || !availability || !category) {
            setMessage('Please fill in required fields.');
            return;
        }

        if (!createdBy) {
            setMessage('User ID not found. Please log in again.');
            return;
        }

        try {
            const response = await axios.post('http://localhost/backend/add_menu_item.php', {
                name,
                description,
                price: parseFloat(price),
                availability,
                category,
                created_by: createdBy,
            });

            if (response.data.status === 'success') {
                setMessage('Menu item added successfully.');
                setName('');
                setDescription('');
                setPrice('');
                setAvailability('');
                setCategory('');
                fetchMenuItems(); // Refresh menu items
            } else {
                setMessage(response.data.message || 'Failed to add item.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Server error. Please try again.');
        }
    };

    return (
        <div className="staff-menu-container">
            <h2>Manage Menu</h2>
            {message && <p className="message">{message}</p>}

            {/* Add Menu Item Form */}
            <form onSubmit={handleSubmit} className="menu-form">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                >
                    <option value="">Select Availability</option>
                    <option value="breakfast">Breakfast Time</option>
                    <option value="lunch">Lunch Time</option>
                    <option value="both">Both Times</option>
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="special dish">Special Dish</option>
                </select>
                <button type="submit">Add Item</button>
            </form>

            {/* Display Menu Items */}
            <h3>Menu Items</h3>
            <ul>
                {menuItems.map((item: any) => (
                    <li key={item.id}>
                        {item.name} - {item.price} ({item.availability})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StaffMenu;

