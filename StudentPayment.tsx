import React, {useState} from "react";
import axios from "axios";
import '../../styles/styles.css';


const StudentPayment: React.FC= () => {
    const[orderId, setOrderId]=useState('');
    const[payMethod,setPayMethod]=useState('M-Pesa');
    const[amount, setAmount]=useState('');
    const[message, setMessage]=useState('');


//handle payment submission
const handlePayment= async (e:React.FormEvent) =>{
    e.preventDefault();
    try{
        await axios.post('http://localhost/backend/process_payment.php',
            {order_id:orderId, pay_method:payMethod, amount}, {withCredentials:true});
            setMessage('Payment successful.');
        }catch{
            setMessage('Payment failed.');
        }
        };
        
return(
    <div className='container'>
        <h2>CheckOut</h2>
            {message && <p>{message}</p>}

    <form onSubmit={handlePayment}>
    <label>Order ID:</label>
    <input type='text' value={orderId} onChange={(e)=> setOrderId(e.target.value)} required/>

    <label>Amount (KES):</label>
    <input type='text' value={amount} onChange={(e)=> setAmount(e.target.value)} required/>

    <label>Payment Method:</label>
    <select value={payMethod} onChange={(e)=> setPayMethod(e.target.value)}>

        <option value='M-Pesa'>M-Pesa</option>
        <option value='Cash'>Cash</option>
    </select>
   
     {/*Payment placeholder*/}
            <button type="submit">Pay Now</button>
        </form>
        </div>
    );
};

export default StudentPayment;