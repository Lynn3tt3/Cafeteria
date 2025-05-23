import React, {useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css'


const StaffHome:React.FC=()=>{
    //state to store fetched orders
    const[stats,setStats]=useState<any>({});  
    //state to store filter value
    const[error,setError]=useState('');

    //fetch orders from the backend function
    useEffect(()=>{
            axios.get('http://localhost/backend/get_all_orders.php', {withCredentials:true}) //add backend placeholder url 
            .then(response=> setStats(response.data))
            .catch(() => setError('Error loading statistics.'));
            }, []);
        
    return(
        <div className= 'container'>
            <h2>Staff Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            <p><strong>Total Orders:</strong>{stats.total_orders}</p>
            <p><strong>Pending Orders:</strong>{stats.pending_orders}</p>
            <p><strong>Complete Orders:</strong>{stats.complete_orders}</p>
            <p><strong>Total Revenue:</strong>{stats.total_revenue}</p>
                    </div>
    );
};
                
export default StaffHome;