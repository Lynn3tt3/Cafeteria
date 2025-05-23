import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/styles.css';

const StudentHome: React.FC= () =>{
  const navigate= useNavigate();

  return (
    <div className= 'container'>
      <h2>Welcome to CUEA Cafeteria</h2>
      <p>Pre-book meals, manage orders and enjoy your dining experience </p>
      
      <div style={{display:'flex', gap: '10px'}}>
        <button onClick={()=>navigate('/student/menu')}>View Menu</button>
        <button onClick={()=>navigate('/student/orders')}>My Orders</button>
        <button onClick={()=>navigate('/student/profile')}>Profile</button>
    </div>
    </div>
  );
};
    
export default StudentHome;