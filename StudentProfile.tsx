import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/styles.css';

const StudentProfile:React.FC = () =>{
    const[profile, setProfile]= useState<any>({});
    const[message, setMessage]=useState('');

    useEffect(()=> {
        axios.get('http://localhost/backend/get_user_details.php', {withCredentials:true})
        .then(response => setProfile(response.data.user))
        .catch(()=> setMessage('Failed to load profile.'));
    }, []);

return(
    <div className='container'>
        <h2>My Profile</h2>
        {message && <p>{message}</p>}
        <p><strong>Name:</strong>{profile.name}</p>
        <p><strong>Email:</strong>{profile.email}</p>
        <p><strong>Phone:</strong>{profile.phone}</p>
        </div>
);
};

export default StudentProfile;