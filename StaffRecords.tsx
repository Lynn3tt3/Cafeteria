import React, {useState,useEffect} from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StaffReports=() =>{
    const[reports,setReports]=useState([]);
    const[startDate,setStartDate]=useState('');
    const[endDate,setEndDate]=useState('');
    const[error, setError]=useState('');
    
//fetch reports based on date range 
const fetchReports= async()=>{
    try{
        const response=await axios.post('http://localhost/backend/filter_reports.php',
            {start_date:startDate, end_date:endDate});
            setReports(response.data.reports);
    }catch{
        setError('Error loading reports.');
    }
};

//convert JSON to CSV
const downloadCSV= async() =>{
    let csvContent= 'Order ID ,Student, Item, Quantity, Amount, Payment Method, Status, Date\n';
    reports.forEach((report:any)=>{
        csvContent +=`${report.order_id},${report.student_name},${report.menu_item},${report.quantity},
        ${report.amount},${report.pay_method},${report.order_status},${report.created_at}\n`;
    });
        const blob=new Blob([csvContent],{type:'text/csv'});
        const link=document.createElement('a');
        link.href=url.createObjectURL(blob);;
        link.download='cafeteria_reports.csv';
        link.click();
};
    
    return (
        <div className='container'>
            <h2>Generate Reports</h2>
            {error && <p className= 'error'>{error}</p>}

            {/* Date Filter form */}
           <div>
                <label>Start Date:</label>
                <input type='date' value={startDate}
                 onChange={(e)=>setStartDate(e.target.value)}/>

                <label>End Date:</label>
                <input type='date' value={endDate} 
                onChange={(e)=>setEndDate(e.target.value)} />
                <button onClick={fetchReports}>Filter onClick=</button>
                </div>


            {/* Reports Table */}
            <table> 
                <thead>
                    <tr>
                <th>Order ID</th><th>Student</th><th>Item</th><th>Quantity</th>
                <th>Amount</th><th>Payment</th><th>Status</th><th>Date</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report:any) => (
                    <tr key={report.order_id}>
                    <td>{report.order_id}</td><td>{report.student_name}</td><td>{report.menu_item}</td>
                    <td>{report.quantity}</td><td>{report.amount}</td><td>{report.pay_method}</td><td>
                        {report.order_status}</td><td>{report.created_at}</td>
                        </tr>
                ))}
                </tbody>
                </table>

            {/* Download CSV Button */}
            <button onClick={downloadCSV}>Download CSV File </button>
        </div>
    );
};

export default StaffReports;
