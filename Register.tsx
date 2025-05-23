import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';

const Register: React.FC=() => {
    //state variales for user input fields
    const[name, setName]= useState('');
    const[email, setEmail]= useState('');
    const[phone, setPhone]=useState('');
    const[password, setPassword]= useState('');
    const[role, setRole]= useState('student'); //default role
    const[error, setError]= useState('');
    const[success, setSuccess]=useState('');
    const navigate= useNavigate();

    //function to handle registration
    const handleRegister= async(e:React.FormEvent) => {
            e.preventDefault();
            setError('');
            setSuccess(''); //reset success messages

        if(!name||!email||!phone||!password) {
            setError('Please fill in all fields.');
            return;
        }

            try{
        //send login request to php backend
const response= await axios.post("http://localhost/backend/register.php",
    {name, email, phone, password, role}, 
    {headers:{'Content-Type':'application/json'}, withCredentials:true}
            );

            console.log('Backend response:', response.data);

    if(response.data.status === 'success'){
        setSuccess('Registration successful. Redirecting to login page...');
        setTimeout(()=> navigate('/login'), 2000); //redirect to login page after successful registration
            }else{
                setError(response.data.message ||'Registration failed. Try again.'); //error message if it fails
                    }
                    } catch (error:any){
                        console.error('Error:', error);
                        setError(error.response?.data?.message || 'Something went wrong. Please try again.');
                    }
            };
    
    
return(
        <div className='container'>
        <h2>Registration</h2>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}

     <form onSubmit={handleRegister}>
        <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required />
        <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}  required />
        <input type='text' placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}   required />

        {/*dropdown for selecting user role*/}
        <label >Select Role</label>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value='student'>Student</option>
            <option value='staff'>Staff</option>
        </select>
            <button type='submit'>Register </button>
                </form>

        {/*link to login page*/}
        <p>Already have an account?<a href='/login'>Login here</a></p>
        </div>
    );
};

export default Register;