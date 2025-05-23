import React, {useState,useEffect} from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StaffInventory: React.FC=() =>{
    const[inventory, setInventory]= useState([]);
    const[error, setError]=useState('');

useEffect(()=> {
    axios.get('http://localhost/backend/get_inventory.php')
    .then(response=> setInventory(response.data.inventory))
    .catch(()=> setError('Failed to load inventory.'));
}, []);

return(
    <div className='container'>
        <h2>Food Inventory</h2>
        {error && <p className='error'>{error}</p>}

{/*Inventory table*/}
        <table>
            <thead>
                <tr>
                    <th>Item</th><th>Total Ordered</th>
                    </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item:any)=>(
                            <tr key={item.menu_item_id}>
                                <td>{item.item_name}</td>
                                <td>{item.total_ordered}</td>
                                </tr>
                        ))}
                        </tbody>
                        </table>
                        </div>
);
};

export default StaffInventory;